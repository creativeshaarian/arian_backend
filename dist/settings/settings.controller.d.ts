import { SettingsService } from './settings.service';
export declare class SettingsController {
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
}
