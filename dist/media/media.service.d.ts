import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { MediaAsset } from './entities/media-asset.entity';
export declare class MediaService {
    private readonly repo;
    private readonly config;
    private readonly uploadRoot;
    constructor(repo: Repository<MediaAsset>, config: ConfigService);
    getUploadRoot(): string;
    getPublicBaseUrl(): string;
    private getExtension;
    validateFile(file: Express.Multer.File): void;
    upload(file: Express.Multer.File, alt?: string, folder?: string): Promise<MediaAsset>;
    findAll(): Promise<MediaAsset[]>;
    findById(id: string): Promise<MediaAsset>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
