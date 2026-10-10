import { Repository } from 'typeorm';
import { SiteSetting } from '../cms/entities/site-setting.entity';
export declare class SettingsService {
    private readonly siteSettingRepo;
    constructor(siteSettingRepo: Repository<SiteSetting>);
    upsertByKey(key: string, value: unknown): Promise<SiteSetting>;
    getSiteMeta(): Promise<{
        title?: string;
        description?: string;
        favicon?: string;
        faviconMediaId?: string;
        frontendTheme?: "light" | "dark";
    }>;
    updateSiteMeta(value: {
        title: string;
        description: string;
        favicon?: string;
        faviconMediaId?: string;
        frontendTheme?: 'light' | 'dark';
    }): Promise<{
        title: string;
        description: string;
        favicon?: string;
        faviconMediaId?: string;
        frontendTheme?: "light" | "dark";
    }>;
    getSectionVisibility(): Promise<Record<string, boolean>>;
    getSectionOrder(): Promise<string[]>;
    updateSectionVisibility(sections: Record<string, boolean>, order?: string[]): Promise<{
        sections: {
            [x: string]: boolean;
        };
        order: string[];
    }>;
    getPublicSettings(): Promise<{
        site: {
            title?: string;
            description?: string;
            favicon?: string;
            faviconMediaId?: string;
            frontendTheme?: "light" | "dark";
        };
        sections: Record<string, boolean>;
        order: string[];
    }>;
}
