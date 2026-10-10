import { MediaAsset } from '../../media/entities/media-asset.entity';
import type { MediaEntityType, MediaFieldRole } from '../../cms/constants/cms.constants';
export declare class MediaRelation {
    id: string;
    mediaId: string;
    media: MediaAsset;
    entityType: MediaEntityType;
    entityId: string;
    field: MediaFieldRole;
    sortOrder: number;
    createdAt: Date;
}
