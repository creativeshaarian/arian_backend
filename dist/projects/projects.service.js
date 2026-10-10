"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const slug_helper_1 = require("../common/helpers/slug.helper");
const project_serializer_1 = require("../common/serializers/project.serializer");
const project_images_service_1 = require("./project-images.service");
const media_relation_service_1 = require("../media/media-relation.service");
let ProjectsService = class ProjectsService {
    constructor(repo, projectImagesService, mediaRelationService) {
        this.repo = repo;
        this.projectImagesService = projectImagesService;
        this.mediaRelationService = mediaRelationService;
    }
    async findAll(includeDrafts = false) {
        const projects = await this.repo.find({
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
        const filtered = includeDrafts
            ? projects
            : projects.filter((p) => p.status !== 'draft');
        return filtered.map(project_serializer_1.serializeProject);
    }
    async findAllForCms() {
        const projects = await this.repo.find({
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
        return projects.map(project_serializer_1.serializeProject);
    }
    async findBySlug(slug) {
        const project = await this.repo.findOne({ where: { slug } });
        if (!project || project.status === 'draft') {
            throw new common_1.NotFoundException(`Project "${slug}" not found`);
        }
        const images = await this.projectImagesService.findByProjectId(project.id);
        return (0, project_serializer_1.serializeProjectDetail)(project, images);
    }
    async findEntityById(id) {
        const project = await this.repo.findOne({ where: { id } });
        if (!project)
            throw new common_1.NotFoundException(`Project "${id}" not found`);
        return project;
    }
    async create(dto) {
        const slug = dto.slug?.trim() || (0, slug_helper_1.slugify)(dto.title);
        const existing = await this.repo.findOne({ where: { slug } });
        if (existing) {
            throw new common_1.ConflictException(`Project slug "${slug}" already exists`);
        }
        const maxOrder = await this.repo
            .createQueryBuilder('p')
            .select('MAX(p.sortOrder)', 'max')
            .getRawOne();
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
        return (0, project_serializer_1.serializeProject)(saved);
    }
    async update(id, dto) {
        const project = await this.findEntityById(id);
        const nextSlug = dto.slug?.trim() || project.slug;
        if (nextSlug !== project.slug) {
            const existing = await this.repo.findOne({ where: { slug: nextSlug } });
            if (existing && existing.id !== id) {
                throw new common_1.ConflictException(`Project slug "${nextSlug}" already exists`);
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
        return (0, project_serializer_1.serializeProject)(saved);
    }
    async remove(id) {
        const project = await this.findEntityById(id);
        await this.repo.remove(project);
        return { success: true };
    }
    async syncFromContent(items) {
        const existingProjects = await this.repo.find();
        const existingBySlug = new Map(existingProjects.map((project) => [project.slug, project]));
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
                await this.syncProjectGalleryFromContent(project.id, item.gallery ?? []);
            }
        }
        for (const project of existingProjects) {
            if (!incomingSlugs.has(project.slug)) {
                await this.repo.remove(project);
            }
        }
    }
    projectInputToEntityData(item, sortOrder) {
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
    async syncProjectGalleryFromContent(projectId, galleryUrls) {
        const existingImages = await this.projectImagesService.findByProjectId(projectId);
        const galleryImages = existingImages.filter((image) => image.type === 'gallery');
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
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        project_images_service_1.ProjectImagesService,
        media_relation_service_1.MediaRelationService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map