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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const path = require("path");
const content_section_entity_1 = require("./entities/content-section.entity");
const content_types_1 = require("./content.types");
const projects_service_1 = require("../projects/projects.service");
const blog_service_1 = require("../blog/blog.service");
const blog_category_service_1 = require("../blog/blog-category.service");
const cms_aggregator_service_1 = require("../cms/cms-aggregator.service");
const cms_normalized_service_1 = require("../cms/cms-normalized.service");
let ContentService = class ContentService {
    constructor(repo, projectsService, blogService, blogCategoryService, cmsAggregator, cmsNormalized) {
        this.repo = repo;
        this.projectsService = projectsService;
        this.blogService = blogService;
        this.blogCategoryService = blogCategoryService;
        this.cmsAggregator = cmsAggregator;
        this.cmsNormalized = cmsNormalized;
    }
    async onModuleInit() {
        const count = await this.repo.count();
        if (count === 0) {
            await this.seedFromFile();
        }
        const migrated = await this.cmsNormalized.isMigrated();
        if (!migrated) {
            await this.syncRelationalTables();
        }
    }
    findAll() {
        return this.cmsAggregator.buildSiteContent();
    }
    async findSection(key) {
        if (!(0, content_types_1.isContentSectionKey)(key)) {
            throw new common_1.NotFoundException(`Section "${key}" not found`);
        }
        const content = await this.cmsAggregator.buildSiteContent();
        if (content[key] === undefined) {
            throw new common_1.NotFoundException(`Section "${key}" not found`);
        }
        return { section: key, data: content[key] };
    }
    async updateSection(key, data) {
        await this.repo.save({ key, data });
        const migrated = await this.cmsNormalized.isMigrated();
        if (!migrated &&
            (key === 'projects' || key === 'blogPosts' || key === 'blogCategories')) {
            await this.syncRelationalTables();
        }
        return this.findAll();
    }
    async reset() {
        const migrated = await this.cmsNormalized.isMigrated();
        if (migrated) {
            throw new common_1.NotFoundException('CMS is migrated — reset via legacy content_sections is disabled');
        }
        await this.repo.clear();
        await this.seedFromFile();
        await this.syncRelationalTables();
        return this.findAll();
    }
    async syncRelationalTables() {
        const rows = await this.repo.find();
        const content = {};
        for (const row of rows) {
            content[row.key] = row.data;
        }
        if (Array.isArray(content.projects)) {
            await this.projectsService.syncFromContent(content.projects);
        }
        if (Array.isArray(content.blogPosts)) {
            await this.blogService.syncFromContent(content.blogPosts);
        }
        if (Array.isArray(content.blogCategories)) {
            await this.blogCategoryService.syncFromContent(content.blogCategories);
        }
    }
    async seedFromFile() {
        const filePath = path.join(process.cwd(), 'data', 'content.json');
        let seed;
        if (fs.existsSync(filePath)) {
            seed = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        else {
            seed = {};
        }
        for (const key of content_types_1.CONTENT_SECTIONS) {
            if (seed[key] !== undefined) {
                await this.repo.save({ key, data: seed[key] });
            }
        }
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(content_section_entity_1.ContentSection)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        projects_service_1.ProjectsService,
        blog_service_1.BlogService,
        blog_category_service_1.BlogCategoryService,
        cms_aggregator_service_1.CmsAggregatorService,
        cms_normalized_service_1.CmsNormalizedService])
], ContentService);
//# sourceMappingURL=content.service.js.map