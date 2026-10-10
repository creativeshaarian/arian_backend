import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ContentSection } from './entities/content-section.entity';
import { ContentSectionKey, SiteContent } from './content.types';
import { ProjectsService } from '../projects/projects.service';
import { BlogService } from '../blog/blog.service';
import { BlogCategoryService } from '../blog/blog-category.service';
import { CmsAggregatorService } from '../cms/cms-aggregator.service';
import { CmsNormalizedService } from '../cms/cms-normalized.service';
export declare class ContentService implements OnModuleInit {
    private readonly repo;
    private readonly projectsService;
    private readonly blogService;
    private readonly blogCategoryService;
    private readonly cmsAggregator;
    private readonly cmsNormalized;
    constructor(repo: Repository<ContentSection>, projectsService: ProjectsService, blogService: BlogService, blogCategoryService: BlogCategoryService, cmsAggregator: CmsAggregatorService, cmsNormalized: CmsNormalizedService);
    onModuleInit(): Promise<void>;
    findAll(): Promise<SiteContent>;
    findSection(key: string): Promise<{
        section: "site" | "hero" | "about" | "navbar" | "navLinks" | "navUtilityLinks" | "skills" | "socialLinks" | "stack" | "services" | "projects" | "blogPosts" | "blogCategories" | "experience" | "certifications" | "testimonials" | "footer" | "pricingPlans" | "sectionVisibility" | "sectionOrder";
        data: {} | null;
    }>;
    updateSection(key: ContentSectionKey, data: unknown): Promise<SiteContent>;
    reset(): Promise<SiteContent>;
    private syncRelationalTables;
    private seedFromFile;
}
