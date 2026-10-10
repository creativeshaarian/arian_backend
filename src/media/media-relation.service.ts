import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaAsset } from './entities/media-asset.entity';
import { MediaRelation } from './entities/media-relation.entity';
import type {
  MediaEntityType,
  MediaFieldRole,
} from '../cms/constants/cms.constants';

@Injectable()
export class MediaRelationService {
  constructor(
    @InjectRepository(MediaAsset)
    private readonly mediaRepo: Repository<MediaAsset>,
    @InjectRepository(MediaRelation)
    private readonly relationRepo: Repository<MediaRelation>,
  ) {}

  async resolveMediaUrl(mediaId?: string | null): Promise<string | undefined> {
    if (!mediaId) return undefined;
    const media = await this.mediaRepo.findOne({ where: { id: mediaId } });
    return media?.url;
  }

  async resolveMediaUrlOrFallback(
    mediaId?: string | null,
    fallback?: string,
  ): Promise<string> {
    const url = await this.resolveMediaUrl(mediaId);
    return url ?? fallback ?? '';
  }

  async linkMedia(input: {
    mediaId: string;
    entityType: MediaEntityType;
    entityId: string;
    field: MediaFieldRole;
    sortOrder?: number;
  }) {
    const media = await this.mediaRepo.findOne({
      where: { id: input.mediaId },
    });
    if (!media) {
      throw new NotFoundException(`Media "${input.mediaId}" not found`);
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

  async linkGalleryImage(input: {
    mediaId: string;
    entityType: MediaEntityType;
    entityId: string;
    sortOrder?: number;
  }) {
    const media = await this.mediaRepo.findOne({
      where: { id: input.mediaId },
    });
    if (!media) {
      throw new NotFoundException(`Media "${input.mediaId}" not found`);
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

  async getEntityMedia(
    entityType: MediaEntityType,
    entityId: string,
    field: MediaFieldRole,
  ) {
    const relation = await this.relationRepo.findOne({
      where: { entityType, entityId, field },
      relations: ['media'],
    });
    return relation?.media ?? null;
  }

  async getGalleryMedia(entityType: MediaEntityType, entityId: string) {
    const relations = await this.relationRepo.find({
      where: { entityType, entityId, field: 'gallery' },
      relations: ['media'],
      order: { sortOrder: 'ASC' },
    });
    return relations.map((r) => r.media).filter(Boolean);
  }

  async unlinkGallery(relationId: string) {
    const relation = await this.relationRepo.findOne({
      where: { id: relationId },
    });
    if (!relation) {
      throw new NotFoundException(`Media relation "${relationId}" not found`);
    }
    await this.relationRepo.remove(relation);
    return { success: true };
  }

  async unlinkField(
    entityType: MediaEntityType,
    entityId: string,
    field: MediaFieldRole,
  ) {
    await this.relationRepo.delete({ entityType, entityId, field });
    return { success: true };
  }
}
