import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { MediaAsset } from './entities/media-asset.entity';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/svg',
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'application/octet-stream', // some browsers send this for svg/ico
  'text/xml',
  'application/xml',
]);

const ALLOWED_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'webp',
  'gif',
  'svg',
  'ico',
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const EXTENSION_MAP: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/svg': 'svg',
  'image/x-icon': 'ico',
  'image/vnd.microsoft.icon': 'ico',
};

@Injectable()
export class MediaService {
  private readonly uploadRoot: string;

  constructor(
    @InjectRepository(MediaAsset)
    private readonly repo: Repository<MediaAsset>,
    private readonly config: ConfigService,
  ) {
    this.uploadRoot = path.join(process.cwd(), 'uploads');
  }

  getUploadRoot(): string {
    return this.uploadRoot;
  }

  getPublicBaseUrl(): string {
    return (
      this.config.get<string>('API_PUBLIC_URL') ??
      this.config.get<string>('API_URL') ??
      'https://api.shaarian.com'
    ).replace(/\/$/, '');
  }

  private getExtension(file: Express.Multer.File) {
    const fromName = path
      .extname(file.originalname || '')
      .replace('.', '')
      .toLowerCase();
    if (fromName && ALLOWED_EXTENSIONS.has(fromName)) return fromName;
    return EXTENSION_MAP[file.mimetype] ?? '';
  }

  validateFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const ext = this.getExtension(file);
    const mimeOk = ALLOWED_MIME_TYPES.has(file.mimetype);
    const extOk = Boolean(ext) && ALLOWED_EXTENSIONS.has(ext);
    if (!mimeOk && !extOk) {
      throw new BadRequestException(
        'Invalid file type. Allowed: jpg, png, webp, gif, svg, ico',
      );
    }
    if (!extOk) {
      throw new BadRequestException(
        'Invalid file extension. Allowed: jpg, png, webp, gif, svg, ico',
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('File size exceeds 5MB limit');
    }
  }

  async upload(file: Express.Multer.File, alt?: string, folder?: string) {
    this.validateFile(file);

    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const ext = this.getExtension(file) || 'bin';
    const filename = `${randomUUID()}.${ext}`;
    const relativeDir = path.join(year, month);
    const absoluteDir = path.join(this.uploadRoot, relativeDir);

    fs.mkdirSync(absoluteDir, { recursive: true });

    const absolutePath = path.join(absoluteDir, filename);
    const buffer = file.buffer ?? (file.path ? fs.readFileSync(file.path) : null);
    if (!buffer) {
      throw new BadRequestException('Upload failed: empty file buffer');
    }
    fs.writeFileSync(absolutePath, buffer);

    const urlPath = `/uploads/${relativeDir.replace(/\\/g, '/')}/${filename}`;
    const url = `${this.getPublicBaseUrl()}${urlPath}`;

    const asset = this.repo.create({
      filename,
      originalName: file.originalname,
      url,
      mimeType: file.mimetype,
      size: file.size,
      alt,
      folder,
    });

    return this.repo.save(asset);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string) {
    const asset = await this.repo.findOne({ where: { id } });
    if (!asset) throw new NotFoundException(`Media "${id}" not found`);
    return asset;
  }

  async remove(id: string) {
    const asset = await this.findById(id);
    const relativePath = asset.url.replace(this.getPublicBaseUrl(), '');
    const absolutePath = path.join(
      process.cwd(),
      relativePath.replace(/^\//, '').replace(/\//g, path.sep),
    );

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    await this.repo.remove(asset);
    return { success: true };
  }
}
