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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const path = require("path");
const crypto_1 = require("crypto");
const media_asset_entity_1 = require("./entities/media-asset.entity");
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
    'application/octet-stream',
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
const EXTENSION_MAP = {
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
let MediaService = class MediaService {
    constructor(repo, config) {
        this.repo = repo;
        this.config = config;
        this.uploadRoot = path.join(process.cwd(), 'uploads');
    }
    getUploadRoot() {
        return this.uploadRoot;
    }
    getPublicBaseUrl() {
        return (this.config.get('API_PUBLIC_URL') ??
            this.config.get('API_URL') ??
            'https://api.shaarian.com').replace(/\/$/, '');
    }
    getExtension(file) {
        const fromName = path
            .extname(file.originalname || '')
            .replace('.', '')
            .toLowerCase();
        if (fromName && ALLOWED_EXTENSIONS.has(fromName))
            return fromName;
        return EXTENSION_MAP[file.mimetype] ?? '';
    }
    validateFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const ext = this.getExtension(file);
        const mimeOk = ALLOWED_MIME_TYPES.has(file.mimetype);
        const extOk = Boolean(ext) && ALLOWED_EXTENSIONS.has(ext);
        if (!mimeOk && !extOk) {
            throw new common_1.BadRequestException('Invalid file type. Allowed: jpg, png, webp, gif, svg, ico');
        }
        if (!extOk) {
            throw new common_1.BadRequestException('Invalid file extension. Allowed: jpg, png, webp, gif, svg, ico');
        }
        if (file.size > MAX_FILE_SIZE) {
            throw new common_1.BadRequestException('File size exceeds 5MB limit');
        }
    }
    async upload(file, alt, folder) {
        this.validateFile(file);
        const now = new Date();
        const year = String(now.getFullYear());
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const ext = this.getExtension(file) || 'bin';
        const filename = `${(0, crypto_1.randomUUID)()}.${ext}`;
        const relativeDir = path.join(year, month);
        const absoluteDir = path.join(this.uploadRoot, relativeDir);
        fs.mkdirSync(absoluteDir, { recursive: true });
        const absolutePath = path.join(absoluteDir, filename);
        const buffer = file.buffer ?? (file.path ? fs.readFileSync(file.path) : null);
        if (!buffer) {
            throw new common_1.BadRequestException('Upload failed: empty file buffer');
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
    async findById(id) {
        const asset = await this.repo.findOne({ where: { id } });
        if (!asset)
            throw new common_1.NotFoundException(`Media "${id}" not found`);
        return asset;
    }
    async remove(id) {
        const asset = await this.findById(id);
        const relativePath = asset.url.replace(this.getPublicBaseUrl(), '');
        const absolutePath = path.join(process.cwd(), relativePath.replace(/^\//, '').replace(/\//g, path.sep));
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }
        await this.repo.remove(asset);
        return { success: true };
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(media_asset_entity_1.MediaAsset)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], MediaService);
//# sourceMappingURL=media.service.js.map