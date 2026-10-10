export type SiteContent = Record<string, unknown>;
export declare const CONTENT_SECTIONS: readonly ["site", "hero", "about", "navbar", "navLinks", "navUtilityLinks", "skills", "socialLinks", "stack", "services", "projects", "blogPosts", "blogCategories", "experience", "certifications", "testimonials", "footer", "pricingPlans", "sectionVisibility", "sectionOrder"];
export type ContentSectionKey = (typeof CONTENT_SECTIONS)[number];
export declare function isContentSectionKey(key: string): key is ContentSectionKey;
