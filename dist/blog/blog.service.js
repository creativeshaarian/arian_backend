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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blog_post_entity_1 = require("./entities/blog-post.entity");
const slug_helper_1 = require("../common/helpers/slug.helper");
const blog_serializer_1 = require("../common/serializers/blog.serializer");
const media_relation_service_1 = require("../media/media-relation.service");
let BlogService = class BlogService {
    constructor(repo, mediaRelationService) {
        this.repo = repo;
        this.mediaRelationService = mediaRelationService;
    }
    async findAll(includeDrafts = false) {
        const posts = await this.repo.find({
            order: { sortOrder: 'ASC', dateISO: 'DESC' },
        });
        const filtered = includeDrafts
            ? posts
            : posts.filter((p) => p.status !== 'draft');
        return filtered.map(blog_serializer_1.serializeBlogPost);
    }
    async findAllForCms() {
        const posts = await this.repo.find({
            order: { sortOrder: 'ASC', dateISO: 'DESC' },
        });
        return posts.map(blog_serializer_1.serializeBlogPost);
    }
    async findBySlug(slug) {
        const post = await this.repo.findOne({ where: { slug } });
        if (!post || post.status === 'draft') {
            throw new common_1.NotFoundException(`Blog post "${slug}" not found`);
        }
        return (0, blog_serializer_1.serializeBlogPostDetail)(post);
    }
    async findEntityById(id) {
        const post = await this.repo.findOne({ where: { id } });
        if (!post)
            throw new common_1.NotFoundException(`Blog post "${id}" not found`);
        return post;
    }
    async create(dto) {
        const slug = dto.slug?.trim() || (0, slug_helper_1.slugify)(dto.title);
        const existing = await this.repo.findOne({ where: { slug } });
        if (existing) {
            throw new common_1.ConflictException(`Blog slug "${slug}" already exists`);
        }
        const maxOrder = await this.repo
            .createQueryBuilder('b')
            .select('MAX(b.sortOrder)', 'max')
            .getRawOne();
        const entity = this.repo.create({
            slug,
            title: dto.title,
            titleAccent: dto.titleAccent,
            excerpt: dto.excerpt,
            category: dto.category,
            categoryLabel: dto.categoryLabel,
            author: dto.author,
            readingTime: dto.readingTime,
            date: dto.date,
            dateISO: dto.dateISO,
            image: dto.image,
            imageAlt: dto.imageAlt,
            article: dto.article ?? null,
            status: dto.status ?? 'published',
            sortOrder: dto.sortOrder ?? (maxOrder?.max ?? 0) + 1,
        });
        if (dto.imageMediaId) {
            entity.image =
                (await this.mediaRelationService.resolveMediaUrl(dto.imageMediaId)) ??
                    dto.image;
            entity.imageMediaId = dto.imageMediaId;
        }
        const saved = await this.repo.save(entity);
        if (dto.imageMediaId) {
            await this.mediaRelationService.linkMedia({
                mediaId: dto.imageMediaId,
                entityType: 'blog',
                entityId: saved.id,
                field: 'cover',
            });
        }
        return (0, blog_serializer_1.serializeBlogPostDetail)(saved);
    }
    async update(id, dto) {
        const post = await this.findEntityById(id);
        const nextSlug = dto.slug?.trim() || post.slug;
        if (nextSlug !== post.slug) {
            const existing = await this.repo.findOne({ where: { slug: nextSlug } });
            if (existing && existing.id !== id) {
                throw new common_1.ConflictException(`Blog slug "${nextSlug}" already exists`);
            }
        }
        if (dto.imageMediaId) {
            const resolved = await this.mediaRelationService.linkMedia({
                mediaId: dto.imageMediaId,
                entityType: 'blog',
                entityId: id,
                field: 'cover',
            });
            post.image = resolved.url;
            post.imageMediaId = dto.imageMediaId;
        }
        else if (dto.image !== undefined) {
            post.image = dto.image;
        }
        Object.assign(post, {
            slug: nextSlug,
            title: dto.title ?? post.title,
            titleAccent: dto.titleAccent ?? post.titleAccent,
            excerpt: dto.excerpt ?? post.excerpt,
            category: dto.category ?? post.category,
            categoryLabel: dto.categoryLabel ?? post.categoryLabel,
            author: dto.author ?? post.author,
            readingTime: dto.readingTime ?? post.readingTime,
            date: dto.date ?? post.date,
            dateISO: dto.dateISO ?? post.dateISO,
            imageAlt: dto.imageAlt ?? post.imageAlt,
            article: dto.article ?? post.article,
            status: dto.status ?? post.status,
            sortOrder: dto.sortOrder ?? post.sortOrder,
        });
        const saved = await this.repo.save(post);
        return (0, blog_serializer_1.serializeBlogPostDetail)(saved);
    }
    async remove(id) {
        const post = await this.findEntityById(id);
        await this.repo.remove(post);
        return { success: true };
    }
    async syncFromContent(items) {
        await this.repo.clear();
        const entities = items.map((item, index) => this.repo.create({
            slug: item.slug,
            title: item.title,
            titleAccent: item.titleAccent,
            excerpt: item.excerpt,
            category: item.category,
            categoryLabel: item.categoryLabel,
            author: item.author,
            readingTime: item.readingTime,
            date: item.date,
            dateISO: item.dateISO,
            image: item.image,
            imageAlt: item.imageAlt,
            article: item.article ?? null,
            status: item.status ?? 'published',
            sortOrder: index,
        }));
        if (entities.length)
            await this.repo.save(entities);
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_post_entity_1.BlogPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        media_relation_service_1.MediaRelationService])
], BlogService);
//# sourceMappingURL=blog.service.js.map