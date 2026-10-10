import { Repository } from 'typeorm';
import { ContentSection } from '../content/entities/content-section.entity';
import { SiteContent } from '../content/content.types';
import { ProjectsService } from '../projects/projects.service';
import { BlogService } from '../blog/blog.service';
import { BlogCategoryService } from '../blog/blog-category.service';
import { CmsNormalizedService } from './cms-normalized.service';
import { SettingsService } from '../settings/settings.service';
export declare class CmsAggregatorService {
    private readonly contentRepo;
    private readonly projectsService;
    private readonly blogService;
    private readonly blogCategoryService;
    private readonly normalizedService;
    private readonly settingsService;
    constructor(contentRepo: Repository<ContentSection>, projectsService: ProjectsService, blogService: BlogService, blogCategoryService: BlogCategoryService, normalizedService: CmsNormalizedService, settingsService: SettingsService);
    private applySectionVisibility;
    buildSiteContent(): Promise<SiteContent>;
}
