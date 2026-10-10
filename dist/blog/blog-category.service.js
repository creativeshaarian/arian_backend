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
exports.BlogCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blog_category_entity_1 = require("./entities/blog-category.entity");
let BlogCategoryService = class BlogCategoryService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll(includeDrafts = false) {
        const categories = await this.repo.find({
            order: { sortOrder: 'ASC', createdAt: 'ASC' },
        });
        const filtered = includeDrafts
            ? categories
            : categories.filter((c) => c.status !== 'draft');
        return filtered.map((c) => ({ id: c.id, label: c.label }));
    }
    async findEntityById(id) {
        const category = await this.repo.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException(`Blog category "${id}" not found`);
        }
        return category;
    }
    async create(dto) {
        const existing = await this.repo.findOne({ where: { id: dto.id } });
        if (existing) {
            throw new common_1.ConflictException(`Category "${dto.id}" already exists`);
        }
        const maxOrder = await this.repo
            .createQueryBuilder('c')
            .select('MAX(c.sortOrder)', 'max')
            .getRawOne();
        const entity = this.repo.create({
            id: dto.id,
            label: dto.label,
            sortOrder: dto.sortOrder ?? (maxOrder?.max ?? 0) + 1,
            status: dto.status ?? 'published',
        });
        const saved = await this.repo.save(entity);
        return { id: saved.id, label: saved.label };
    }
    async update(id, dto) {
        const category = await this.findEntityById(id);
        if (dto.label !== undefined)
            category.label = dto.label;
        if (dto.sortOrder !== undefined)
            category.sortOrder = dto.sortOrder;
        if (dto.status !== undefined)
            category.status = dto.status;
        const saved = await this.repo.save(category);
        return { id: saved.id, label: saved.label };
    }
    async remove(id) {
        const category = await this.findEntityById(id);
        await this.repo.remove(category);
        return { success: true };
    }
    async syncFromContent(items) {
        await this.repo.clear();
        const entities = items.map((item, index) => this.repo.create({
            id: item.id,
            label: item.label,
            sortOrder: index,
            status: 'published',
        }));
        if (entities.length)
            await this.repo.save(entities);
    }
};
exports.BlogCategoryService = BlogCategoryService;
exports.BlogCategoryService = BlogCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_category_entity_1.BlogCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogCategoryService);
//# sourceMappingURL=blog-category.service.js.map