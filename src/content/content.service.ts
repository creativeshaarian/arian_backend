import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { ContentSection } from './entities/content-section.entity';
import {
  CONTENT_SECTIONS,
  ContentSectionKey,
  SiteContent,
  isContentSectionKey,
} from './content.types';
import { ProjectsService } from '../projects/projects.service';
import { BlogService } from '../blog/blog.service';
import { BlogCategoryService } from '../blog/blog-category.service';
import { CmsAggregatorService } from '../cms/cms-aggregator.service';
import { CmsNormalizedService } from '../cms/cms-normalized.service';

@Injectable()
export class ContentService implements OnModuleInit {
  constructor(
    @InjectRepository(ContentSection)
    private readonly repo: Repository<ContentSection>,
    private readonly projectsService: ProjectsService,
    private readonly blogService: BlogService,
    private readonly blogCategoryService: BlogCategoryService,
    private readonly cmsAggregator: CmsAggregatorService,
    private readonly cmsNormalized: CmsNormalizedService,
  ) {}

  async onModuleInit() {
    const count = await this.repo.count();
    if (count === 0) {
      await this.seedFromFile();
    }
    // After CMS migration, relational tables are the source of truth.
    // Never re-push stale content_sections JSON over admin project/blog edits.
    const migrated = await this.cmsNormalized.isMigrated();
    if (!migrated) {
      await this.syncRelationalTables();
    }
  }

  findAll(): Promise<SiteContent> {
    return this.cmsAggregator.buildSiteContent();
  }

  async findSection(key: string) {
    if (!isContentSectionKey(key)) {
      throw new NotFoundException(`Section "${key}" not found`);
    }

    const content = await this.cmsAggregator.buildSiteContent();
    if (content[key] === undefined) {
      throw new NotFoundException(`Section "${key}" not found`);
    }

    return { section: key, data: content[key] };
  }

  async updateSection(key: ContentSectionKey, data: unknown) {
    await this.repo.save({ key, data });
    const migrated = await this.cmsNormalized.isMigrated();
    // Legacy bulk content editor only — skip once normalized CMS owns data.
    if (
      !migrated &&
      (key === 'projects' || key === 'blogPosts' || key === 'blogCategories')
    ) {
      await this.syncRelationalTables();
    }
    return this.findAll();
  }

  async reset() {
    const migrated = await this.cmsNormalized.isMigrated();
    if (migrated) {
      throw new NotFoundException(
        'CMS is migrated — reset via legacy content_sections is disabled',
      );
    }
    await this.repo.clear();
    await this.seedFromFile();
    await this.syncRelationalTables();
    return this.findAll();
  }

  private async syncRelationalTables() {
    const rows = await this.repo.find();
    const content: SiteContent = {};
    for (const row of rows) {
      content[row.key] = row.data;
    }

    if (Array.isArray(content.projects)) {
      await this.projectsService.syncFromContent(content.projects as never[]);
    }
    if (Array.isArray(content.blogPosts)) {
      await this.blogService.syncFromContent(content.blogPosts as never[]);
    }
    if (Array.isArray(content.blogCategories)) {
      await this.blogCategoryService.syncFromContent(
        content.blogCategories as Array<{ id: string; label: string }>,
      );
    }
  }

  private async seedFromFile() {
    const filePath = path.join(process.cwd(), 'data', 'content.json');
    let seed: SiteContent;

    if (fs.existsSync(filePath)) {
      seed = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as SiteContent;
    } else {
      seed = {};
    }

    for (const key of CONTENT_SECTIONS) {
      if (seed[key] !== undefined) {
        await this.repo.save({ key, data: seed[key] });
      }
    }
  }
}
