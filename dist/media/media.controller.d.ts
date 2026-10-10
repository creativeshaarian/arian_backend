import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    findAll(): Promise<import("./entities/media-asset.entity").MediaAsset[]>;
    upload(file: Express.Multer.File, alt?: string, folder?: string): Promise<import("./entities/media-asset.entity").MediaAsset>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
