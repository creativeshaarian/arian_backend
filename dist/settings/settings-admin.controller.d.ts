import { SettingsService } from './settings.service';
import { UpdateSiteMetaDto, UpdateSectionVisibilityDto } from './dto/settings.dto';
export declare class SettingsAdminController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(): Promise<{
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
    updateSite(dto: UpdateSiteMetaDto): Promise<{
        title: string;
        description: string;
        favicon?: string;
        faviconMediaId?: string;
        frontendTheme?: "light" | "dark";
    }>;
    updateSections(dto: UpdateSectionVisibilityDto): Promise<{
        sections: {
            [x: string]: boolean;
        };
        order: string[];
    }>;
}
