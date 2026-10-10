import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { slugify } from '../common/helpers/slug.helper';
import {
  CmsProject,
  serializeProject,
  serializeProjectDetail,
} from '../common/serializers/project.serializer';
import { ProjectImagesService } from './project-images.service';
import { MediaRelationService } from '../media/media-relation.service';

type ProjectInput = {
  slug: string;
  title: string;
  category: string;
  client: string;
  duration: string;
  image: string;
  gallery?: string[];
  heroBackground?: string;
  heroLayout?: 'full' | 'container';
  previewHref: string;
  ctaHref: string;
  ctaLabel: string;
  summary: string;
  content?: Array<{ type: string; text: string }>;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  technologies?: string[];
  status?: string;
};

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
    private readonly projectImagesService: ProjectImagesService,
    private readonly mediaRelationService: MediaRelationService,
  ) {}

  async findAll(includeDrafts = false) {
    const projects = await this.repo.find({
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
    });
    const filtered = includeDrafts
      ? projects
      : projects.filter((p) => p.status !== 'draft');
    return filtered.map(serializeProject);
  }

  async findAllForCms(): Promise<CmsProject[]> {
    const projects = await this.repo.find({
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
    });
    return projects.map(serializeProject);
  }

  async findBySlug(slug: string) {
    const project = await this.repo.findOne({ where: { slug } });
    if (!project || project.status === 'draft') {
      throw new NotFoundException(`Project "${slug}" not found`);
    }
    const images = await this.projectImagesService.findByProjectId(project.id);
    return serializeProjectDetail(project, images);
  }

  async findEntityById(id: string) {
    const project = await this.repo.findOne({ where: { id } });
    if (!project) throw new NotFoundException(`Project "${id}" not found`);
    return project;
  }

  async create(dto: CreateProjectDto) {
    const slug = dto.slug?.trim() || slugify(dto.title);
    const existing = await this.repo.findOne({ where: { slug } });
    if (existing) {
      throw new ConflictException(`Project slug "${slug}" already exists`);
    }

    const maxOrder = await this.repo
      .createQueryBuilder('p')
      .select('MAX(p.sortOrder)', 'max')
      .getRawOne<{ max: number | null }>();

    let coverImage = dto.image;
    if (dto.coverMediaId) {
      coverImage =
        (await this.mediaRelationService.resolveMediaUrl(dto.coverMediaId)) ??
        dto.image;
    }

    const entity = this.repo.create({
      slug,
      title: dto.title,
      category: dto.category,
      client: dto.client,
      duration: dto.duration,
      image: coverImage,
      coverMediaId: dto.coverMediaId,
      gallery: dto.gallery ?? [],
      heroBackground: dto.heroBackground,
      heroLayout: dto.heroLayout,
      previewHref: dto.previewHref,
      ctaHref: dto.ctaHref,
      ctaLabel: dto.ctaLabel,
      summary: dto.summary,
      content: dto.content ?? [],
      githubUrl: dto.githubUrl,
      liveUrl: dto.liveUrl,
      featured: dto.featured ?? false,
      technologies: dto.technologies ?? [],
      status: dto.status ?? 'published',
      sortOrder: dto.sortOrder ?? (maxOrder?.max ?? 0) + 1,
    });

    const saved = await this.repo.save(entity);

    if (dto.coverMediaId) {
      await this.mediaRelationService.linkMedia({
        mediaId: dto.coverMediaId,
        entityType: 'project',
        entityId: saved.id,
        field: 'cover',
      });
    }

    return serializeProject(saved);
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.findEntityById(id);
    const nextSlug = dto.slug?.trim() || project.slug;

    if (nextSlug !== project.slug) {
      const existing = await this.repo.findOne({ where: { slug: nextSlug } });
      if (existing && existing.id !== id) {
        throw new ConflictException(`Project slug "${nextSlug}" already exists`);
      }
    }

    let image = dto.image ?? project.image;
    if (dto.coverMediaId) {
      const resolved = await this.mediaRelationService.linkMedia({
        mediaId: dto.coverMediaId,
        entityType: 'project',
        entityId: id,
        field: 'cover',
      });
      image = resolved.url;
      project.coverMediaId = dto.coverMediaId;
    }

    Object.assign(project, {
      slug: nextSlug,
      title: dto.title ?? project.title,
      category: dto.category ?? project.category,
      client: dto.client ?? project.client,
      duration: dto.duration ?? project.duration,
      image,
      gallery: dto.gallery ?? project.gallery,
      heroBackground: dto.heroBackground ?? project.heroBackground,
      heroLayout: dto.heroLayout ?? project.heroLayout,
      previewHref: dto.previewHref ?? project.previewHref,
      ctaHref: dto.ctaHref ?? project.ctaHref,
      ctaLabel: dto.ctaLabel ?? project.ctaLabel,
      summary: dto.summary ?? project.summary,
      content: dto.content ?? project.content,
      githubUrl: dto.githubUrl ?? project.githubUrl,
      liveUrl: dto.liveUrl ?? project.liveUrl,
      featured: dto.featured ?? project.featured,
      technologies: dto.technologies ?? project.technologies,
      status: dto.status ?? project.status,
      sortOrder: dto.sortOrder ?? project.sortOrder,
    });

    const saved = await this.repo.save(project);
    return serializeProject(saved);
  }

  async remove(id: string) {
    const project = await this.findEntityById(id);
    await this.repo.remove(project);
    return { success: true };
  }

  async syncFromContent(items: ProjectInput[]) {
    const existingProjects = await this.repo.find();
    const existingBySlug = new Map(
      existingProjects.map((project) => [project.slug, project]),
    );
    const incomingSlugs = new Set(items.map((item) => item.slug));

    const toSave = items.map((item, index) => {
      const data = this.projectInputToEntityData(item, index);
      const existing = existingBySlug.get(item.slug);
      if (existing) {
        Object.assign(existing, data);
        return existing;
      }
      return this.repo.create(data);
    });

    const saved = toSave.length ? await this.repo.save(toSave) : [];

    for (const project of saved) {
      const item = items.find((entry) => entry.slug === project.slug);
      if (item) {
        await this.syncProjectGalleryFromContent(
          project.id,
          item.gallery ?? [],
        );
      }
    }

    for (const project of existingProjects) {
      if (!incomingSlugs.has(project.slug)) {
        await this.repo.remove(project);
      }
    }
  }

  private projectInputToEntityData(
    item: ProjectInput,
    sortOrder: number,
  ): Partial<Project> {
    return {
      slug: item.slug,
      title: item.title,
      category: item.category,
      client: item.client,
      duration: item.duration,
      image: item.image,
      gallery: item.gallery ?? [],
      heroBackground: item.heroBackground,
      heroLayout: item.heroLayout,
      previewHref: item.previewHref,
      ctaHref: item.ctaHref,
      ctaLabel: item.ctaLabel,
      summary: item.summary,
      content: item.content ?? [],
      githubUrl: item.githubUrl,
      liveUrl: item.liveUrl,
      featured: item.featured ?? false,
      technologies: item.technologies ?? [],
      status: item.status ?? 'published',
      sortOrder,
    };
  }

  private async syncProjectGalleryFromContent(
    projectId: string,
    galleryUrls: string[],
  ) {
    const existingImages =
      await this.projectImagesService.findByProjectId(projectId);
    const galleryImages = existingImages.filter(
      (image) => image.type === 'gallery',
    );
    const existingUrls = new Set(galleryImages.map((image) => image.url));

    for (const image of galleryImages) {
      if (!galleryUrls.includes(image.url)) {
        await this.projectImagesService.removeImage(projectId, image.id);
      }
    }

    for (const [idx, url] of galleryUrls.entries()) {
      if (!existingUrls.has(url)) {
        await this.projectImagesService.addImage(projectId, {
          url,
          type: 'gallery',
          sortOrder: idx,
        });
      }
    }
  }
}
