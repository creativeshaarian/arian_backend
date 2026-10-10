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
exports.MediaRelationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const media_asset_entity_1 = require("./entities/media-asset.entity");
const media_relation_entity_1 = require("./entities/media-relation.entity");
let MediaRelationService = class MediaRelationService {
    constructor(mediaRepo, relationRepo) {
        this.mediaRepo = mediaRepo;
        this.relationRepo = relationRepo;
    }
    async resolveMediaUrl(mediaId) {
        if (!mediaId)
            return undefined;
        const media = await this.mediaRepo.findOne({ where: { id: mediaId } });
        return media?.url;
    }
    async resolveMediaUrlOrFallback(mediaId, fallback) {
        const url = await this.resolveMediaUrl(mediaId);
        return url ?? fallback ?? '';
    }
    async linkMedia(input) {
        const media = await this.mediaRepo.findOne({
            where: { id: input.mediaId },
        });
        if (!media) {
            throw new common_1.NotFoundException(`Media "${input.mediaId}" not found`);
        }
        await this.relationRepo.delete({
            entityType: input.entityType,
            entityId: input.entityId,
            field: input.field,
        });
        const relation = this.relationRepo.create({
            mediaId: input.mediaId,
            entityType: input.entityType,
            entityId: input.entityId,
            field: input.field,
            sortOrder: input.sortOrder ?? 0,
        });
        await this.relationRepo.save(relation);
        return { url: media.url, mediaId: media.id };
    }
    async linkGalleryImage(input) {
        const media = await this.mediaRepo.findOne({
            where: { id: input.mediaId },
        });
        if (!media) {
            throw new common_1.NotFoundException(`Media "${input.mediaId}" not found`);
        }
        const relation = this.relationRepo.create({
            mediaId: input.mediaId,
            entityType: input.entityType,
            entityId: input.entityId,
            field: 'gallery',
            sortOrder: input.sortOrder ?? 0,
        });
        const saved = await this.relationRepo.save(relation);
        return { id: saved.id, url: media.url, mediaId: media.id };
    }
    async getEntityMedia(entityType, entityId, field) {
        const relation = await this.relationRepo.findOne({
            where: { entityType, entityId, field },
            relations: ['media'],
        });
        return relation?.media ?? null;
    }
    async getGalleryMedia(entityType, entityId) {
        const relations = await this.relationRepo.find({
            where: { entityType, entityId, field: 'gallery' },
            relations: ['media'],
            order: { sortOrder: 'ASC' },
        });
        return relations.map((r) => r.media).filter(Boolean);
    }
    async unlinkGallery(relationId) {
        const relation = await this.relationRepo.findOne({
            where: { id: relationId },
        });
        if (!relation) {
            throw new common_1.NotFoundException(`Media relation "${relationId}" not found`);
        }
        await this.relationRepo.remove(relation);
        return { success: true };
    }
    async unlinkField(entityType, entityId, field) {
        await this.relationRepo.delete({ entityType, entityId, field });
        return { success: true };
    }
};
exports.MediaRelationService = MediaRelationService;
exports.MediaRelationService = MediaRelationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(media_asset_entity_1.MediaAsset)),
    __param(1, (0, typeorm_1.InjectRepository)(media_relation_entity_1.MediaRelation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MediaRelationService);
//# sourceMappingURL=media-relation.service.js.map