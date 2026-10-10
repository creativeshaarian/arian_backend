import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectImage } from '../cms/entities/project-image.entity';
import { Project } from './entities/project.entity';
import { MediaRelationService } from '../media/media-relation.service';
import { AddProjectImageDto } from '../cms/admin/dto/cms-admin.dto';

@Injectable()
export class ProjectImagesService {
  constructor(
    @InjectRepository(ProjectImage)
    private readonly imageRepo: Repository<ProjectImage>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    private readonly mediaRelationService: MediaRelationService,
  ) {}

  async findByProjectId(projectId: string) {
    return this.imageRepo.find({
      where: { projectId },
      order: { sortOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async addImage(projectId: string, dto: AddProjectImageDto) {
    const project = await this.projectRepo.findOne({ where: { id: projectId } });
    if (!project) {
      throw new NotFoundException(`Project "${projectId}" not found`);
    }

    if (!dto.mediaId && !dto.url) {
      throw new BadRequestException('Either mediaId or url is required');
    }

    let url = dto.url ?? '';
    let mediaId = dto.mediaId;

    if (dto.mediaId) {
      const resolved = await this.mediaRelationService.linkGalleryImage({
        mediaId: dto.mediaId,
        entityType: 'project',
        entityId: projectId,
        sortOrder: dto.sortOrder,
      });
      url = resolved.url;
      mediaId = resolved.mediaId;
    }

    const maxOrder = await this.imageRepo
      .createQueryBuilder('i')
      .select('MAX(i.sortOrder)', 'max')
      .where('i.projectId = :projectId', { projectId })
      .getRawOne<{ max: number | null }>();

    const image = this.imageRepo.create({
      projectId,
      url,
      alt: dto.alt,
      type: dto.type ?? 'gallery',
      sortOrder: dto.sortOrder ?? (maxOrder?.max ?? 0) + 1,
      mediaId,
    });

    const saved = await this.imageRepo.save(image);

    if (dto.mediaId) {
      saved.mediaId = dto.mediaId;
      await this.imageRepo.save(saved);
    }

    if (dto.type === 'cover' || (!dto.type && !project.image)) {
      project.image = url;
      if (mediaId) {
        project.coverMediaId = mediaId;
      }
      await this.projectRepo.save(project);
    }

    await this.syncProjectGallery(projectId);
    return saved;
  }

  async removeImage(projectId: string, imageId: string) {
    const image = await this.imageRepo.findOne({
      where: { id: imageId, projectId },
    });
    if (!image) {
      throw new NotFoundException(`Project image "${imageId}" not found`);
    }

    await this.imageRepo.remove(image);

    if (image.mediaId) {
      await this.mediaRelationService.unlinkField('project', projectId, 'gallery');
    }

    await this.syncProjectGallery(projectId);
    return { success: true };
  }

  async syncProjectGallery(projectId: string) {
    const images = await this.findByProjectId(projectId);
    const galleryUrls = images
      .filter((img) => img.type === 'gallery')
      .map((img) => img.url);

    await this.projectRepo.update(projectId, { gallery: galleryUrls });
    return galleryUrls;
  }

  getGalleryUrls(images: ProjectImage[]): string[] {
    return images
      .filter((img) => img.type === 'gallery' || img.type === 'cover')
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((img) => img.url);
  }
}
