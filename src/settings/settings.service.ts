import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSetting } from '../cms/entities/site-setting.entity';
import {
  DEFAULT_SECTION_ORDER,
  DEFAULT_SECTION_VISIBILITY,
  SECTION_ORDER_KEY,
  SECTION_VISIBILITY_KEY,
} from '../cms/constants/cms.constants';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SiteSetting)
    private readonly siteSettingRepo: Repository<SiteSetting>,
  ) {}

  async upsertByKey(key: string, value: unknown) {
    const existing = await this.siteSettingRepo.findOne({ where: { key } });
    if (existing) {
      existing.value = value;
      return this.siteSettingRepo.save(existing);
    }
    return this.siteSettingRepo.save(
      this.siteSettingRepo.create({ key, value }),
    );
  }

  async getSiteMeta() {
    const site = await this.siteSettingRepo.findOne({ where: { key: 'site' } });
    return (
      (site?.value as {
        title?: string;
        description?: string;
        favicon?: string;
        faviconMediaId?: string;
        frontendTheme?: 'light' | 'dark';
      }) ?? {
        title: '',
        description: '',
        frontendTheme: 'light',
      }
    );
  }

  async updateSiteMeta(value: {
    title: string;
    description: string;
    favicon?: string;
    faviconMediaId?: string;
    frontendTheme?: 'light' | 'dark';
  }) {
    const current = await this.getSiteMeta();
    const next = {
      ...current,
      ...value,
    };
    await this.upsertByKey('site', next);
    return next;
  }

  async getSectionVisibility(): Promise<Record<string, boolean>> {
    const row = await this.siteSettingRepo.findOne({
      where: { key: SECTION_VISIBILITY_KEY },
    });
    return {
      ...DEFAULT_SECTION_VISIBILITY,
      ...((row?.value as Record<string, boolean>) ?? {}),
    };
  }

  async getSectionOrder(): Promise<string[]> {
    const row = await this.siteSettingRepo.findOne({
      where: { key: SECTION_ORDER_KEY },
    });
    const stored = row?.value;
    if (Array.isArray(stored) && stored.every((x) => typeof x === 'string')) {
      // Keep unknown keys from defaults appended so new sections still appear
      const known = new Set(stored as string[]);
      const merged = [...(stored as string[])];
      for (const key of DEFAULT_SECTION_ORDER) {
        if (!known.has(key)) merged.push(key);
      }
      return merged;
    }
    return [...DEFAULT_SECTION_ORDER];
  }

  async updateSectionVisibility(
    sections: Record<string, boolean>,
    order?: string[],
  ) {
    const current = await this.getSectionVisibility();
    const merged = { ...current, ...sections };
    await this.upsertByKey(SECTION_VISIBILITY_KEY, merged);

    let nextOrder = await this.getSectionOrder();
    if (Array.isArray(order) && order.length) {
      const cleaned = order.filter((k) => typeof k === 'string' && k.trim());
      if (cleaned.length) {
        await this.upsertByKey(SECTION_ORDER_KEY, cleaned);
        nextOrder = cleaned;
      }
    }

    return { sections: merged, order: nextOrder };
  }

  async getPublicSettings() {
    const [site, sections, order] = await Promise.all([
      this.getSiteMeta(),
      this.getSectionVisibility(),
      this.getSectionOrder(),
    ]);
    return { site, sections, order };
  }
}
