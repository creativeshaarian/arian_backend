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
exports.CmsAggregatorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const content_section_entity_1 = require("../content/entities/content-section.entity");
const projects_service_1 = require("../projects/projects.service");
const blog_service_1 = require("../blog/blog.service");
const blog_category_service_1 = require("../blog/blog-category.service");
const cms_normalized_service_1 = require("./cms-normalized.service");
const settings_service_1 = require("../settings/settings.service");
const cms_constants_1 = require("./constants/cms.constants");
let CmsAggregatorService = class CmsAggregatorService {
    constructor(contentRepo, projectsService, blogService, blogCategoryService, normalizedService, settingsService) {
        this.contentRepo = contentRepo;
        this.projectsService = projectsService;
        this.blogService = blogService;
        this.blogCategoryService = blogCategoryService;
        this.normalizedService = normalizedService;
        this.settingsService = settingsService;
    }
    applySectionVisibility(content, visibility) {
        for (const [section, enabled] of Object.entries(visibility)) {
            if (enabled)
                continue;
            const keys = cms_constants_1.CONTENT_SECTION_MAP[section];
            if (!keys)
                continue;
            for (const key of keys) {
                if (section === 'contact' && key === 'footer') {
                    const footer = content.footer;
                    if (footer && typeof footer === 'object') {
                        content.footer = {
                            ...footer,
                            contact: { phone: '', email: '', phoneHref: '', emailHref: '' },
                        };
                    }
                    continue;
                }
                delete content[key];
            }
        }
    }
    async buildSiteContent() {
        const migrated = await this.normalizedService.isMigrated();
        const content = {};
        if (!migrated) {
            const rows = await this.contentRepo.find();
            for (const row of rows) {
                content[row.key] = row.data;
            }
        }
        const normalized = await this.normalizedService.buildPartialContent();
        for (const [key, value] of Object.entries(normalized)) {
            if (value !== undefined) {
                content[key] = value;
            }
        }
        const visibility = await this.settingsService.getSectionVisibility();
        if (visibility.projects !== false) {
            content.projects = await this.projectsService.findAllForCms();
        }
        else {
            delete content.projects;
        }
        if (visibility.blog !== false) {
            content.blogPosts = await this.blogService.findAllForCms();
            content.blogCategories = await this.blogCategoryService.findAll(true);
        }
        else {
            delete content.blogPosts;
            delete content.blogCategories;
        }
        this.applySectionVisibility(content, visibility);
        const order = await this.settingsService.getSectionOrder();
        content.sectionVisibility = visibility;
        content.sectionOrder = order;
        return content;
    }
};
exports.CmsAggregatorService = CmsAggregatorService;
exports.CmsAggregatorService = CmsAggregatorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(content_section_entity_1.ContentSection)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        projects_service_1.ProjectsService,
        blog_service_1.BlogService,
        blog_category_service_1.BlogCategoryService,
        cms_normalized_service_1.CmsNormalizedService,
        settings_service_1.SettingsService])
], CmsAggregatorService);
//# sourceMappingURL=cms-aggregator.service.js.map