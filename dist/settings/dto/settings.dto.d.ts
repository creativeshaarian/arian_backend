export declare class UpdateSiteMetaDto {
    title: string;
    description: string;
    favicon?: string;
    faviconMediaId?: string;
    frontendTheme?: 'light' | 'dark';
}
export declare class UpdateSectionVisibilityDto {
    sections: Record<string, boolean>;
    order?: string[];
}
export declare class SectionVisibilityMap {
    hero?: boolean;
    about?: boolean;
    services?: boolean;
    stack?: boolean;
    experience?: boolean;
    certifications?: boolean;
    projects?: boolean;
    blog?: boolean;
    contact?: boolean;
    footer?: boolean;
    testimonials?: boolean;
    skills?: boolean;
    pricing?: boolean;
}
