import { ContentService } from './content.service';
import { UpdateContentDto } from './dto/update-content.dto';
import { ResetContentDto } from './dto/reset-content.dto';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    findAll(): Promise<import("./content.types").SiteContent>;
    findSection(section: string): Promise<{
        section: "site" | "hero" | "about" | "navbar" | "navLinks" | "navUtilityLinks" | "skills" | "socialLinks" | "stack" | "services" | "projects" | "blogPosts" | "blogCategories" | "experience" | "certifications" | "testimonials" | "footer" | "pricingPlans" | "sectionVisibility" | "sectionOrder";
        data: {} | null;
    }>;
    update(dto: UpdateContentDto): Promise<import("./content.types").SiteContent>;
    reset(dto: ResetContentDto): Promise<import("./content.types").SiteContent> | {
        error: string;
    };
}
