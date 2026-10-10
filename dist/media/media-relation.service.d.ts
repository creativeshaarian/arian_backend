import { Repository } from 'typeorm';
import { MediaAsset } from './entities/media-asset.entity';
import { MediaRelation } from './entities/media-relation.entity';
import type { MediaEntityType, MediaFieldRole } from '../cms/constants/cms.constants';
export declare class MediaRelationService {
    private readonly mediaRepo;
    private readonly relationRepo;
    constructor(mediaRepo: Repository<MediaAsset>, relationRepo: Repository<MediaRelation>);
    resolveMediaUrl(mediaId?: string | null): Promise<string | undefined>;
    resolveMediaUrlOrFallback(mediaId?: string | null, fallback?: string): Promise<string>;
    linkMedia(input: {
        mediaId: string;
        entityType: MediaEntityType;
        entityId: string;
        field: MediaFieldRole;
        sortOrder?: number;
    }): Promise<{
        url: string;
        mediaId: string;
    }>;
    linkGalleryImage(input: {
        mediaId: string;
        entityType: MediaEntityType;
        entityId: string;
        sortOrder?: number;
    }): Promise<{
        id: string;
        url: string;
        mediaId: string;
    }>;
    getEntityMedia(entityType: MediaEntityType, entityId: string, field: MediaFieldRole): Promise<MediaAsset | null>;
    getGalleryMedia(entityType: MediaEntityType, entityId: string): Promise<MediaAsset[]>;
    unlinkGallery(relationId: string): Promise<{
        success: boolean;
    }>;
    unlinkField(entityType: MediaEntityType, entityId: string, field: MediaFieldRole): Promise<{
        success: boolean;
    }>;
}
