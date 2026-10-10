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
exports.ProjectImagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_image_entity_1 = require("../cms/entities/project-image.entity");
const project_entity_1 = require("./entities/project.entity");
const media_relation_service_1 = require("../media/media-relation.service");
let ProjectImagesService = class ProjectImagesService {
    constructor(imageRepo, projectRepo, mediaRelationService) {
        this.imageRepo = imageRepo;
        this.projectRepo = projectRepo;
        this.mediaRelationService = mediaRelationService;
    }
    async findByProjectId(projectId) {
        return this.imageRepo.find({
            where: { projectId },
            order: { sortOrder: 'ASC', createdAt: 'ASC' },
        });
    }
    async addImage(projectId, dto) {
        const project = await this.projectRepo.findOne({ where: { id: projectId } });
        if (!project) {
            throw new common_1.NotFoundException(`Project "${projectId}" not found`);
        }
        if (!dto.mediaId && !dto.url) {
            throw new common_1.BadRequestException('Either mediaId or url is required');
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
            .getRawOne();
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
    async removeImage(projectId, imageId) {
        const image = await this.imageRepo.findOne({
            where: { id: imageId, projectId },
        });
        if (!image) {
            throw new common_1.NotFoundException(`Project image "${imageId}" not found`);
        }
        await this.imageRepo.remove(image);
        if (image.mediaId) {
            await this.mediaRelationService.unlinkField('project', projectId, 'gallery');
        }
        await this.syncProjectGallery(projectId);
        return { success: true };
    }
    async syncProjectGallery(projectId) {
        const images = await this.findByProjectId(projectId);
        const galleryUrls = images
            .filter((img) => img.type === 'gallery')
            .map((img) => img.url);
        await this.projectRepo.update(projectId, { gallery: galleryUrls });
        return galleryUrls;
    }
    getGalleryUrls(images) {
        return images
            .filter((img) => img.type === 'gallery' || img.type === 'cover')
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((img) => img.url);
    }
};
exports.ProjectImagesService = ProjectImagesService;
exports.ProjectImagesService = ProjectImagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_image_entity_1.ProjectImage)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        media_relation_service_1.MediaRelationService])
], ProjectImagesService);
//# sourceMappingURL=project-images.service.js.map