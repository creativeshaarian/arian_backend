import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentSection } from '../content/entities/content-section.entity';
import { SiteContent } from '../content/content.types';
import { ProjectsService } from '../projects/projects.service';
import { BlogService } from '../blog/blog.service';
import { BlogCategoryService } from '../blog/blog-category.service';
import { CmsNormalizedService } from './cms-normalized.service';
import { SettingsService } from '../settings/settings.service';
import { CONTENT_SECTION_MAP } from './constants/cms.constants';

@Injectable()
export class CmsAggregatorService {
  constructor(
    @InjectRepository(ContentSection)
    private readonly contentRepo: Repository<ContentSection>,
    private readonly projectsService: ProjectsService,
    private readonly blogService: BlogService,
    private readonly blogCategoryService: BlogCategoryService,
    private readonly normalizedService: CmsNormalizedService,
    private readonly settingsService: SettingsService,
  ) {}

  private applySectionVisibility(
    content: SiteContent,
    visibility: Record<string, boolean>,
  ) {
    for (const [section, enabled] of Object.entries(visibility)) {
      if (enabled) continue;
      const keys = CONTENT_SECTION_MAP[section];
      if (!keys) continue;

      for (const key of keys) {
        if (section === 'contact' && key === 'footer') {
          const footer = content.footer as Record<string, unknown> | undefined;
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

  async buildSiteContent(): Promise<SiteContent> {
    const migrated = await this.normalizedService.isMigrated();
    const content: SiteContent = {};

    // Only use legacy content_sections when CMS is NOT migrated.
    // Once migrated, relational tables are the single source of truth —
    // never let stale seed JSON override admin updates.
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
    } else {
      delete content.projects;
    }

    if (visibility.blog !== false) {
      content.blogPosts = await this.blogService.findAllForCms();
      content.blogCategories = await this.blogCategoryService.findAll(true);
    } else {
      delete content.blogPosts;
      delete content.blogCategories;
    }

    this.applySectionVisibility(content, visibility);

    const order = await this.settingsService.getSectionOrder();
    content.sectionVisibility = visibility;
    content.sectionOrder = order;

    return content;
  }
}
