declare class ProjectBlockDto {
    type: string;
    text?: string;
    items?: string[];
    src?: string;
    alt?: string;
    code?: string;
    language?: string;
    caption?: string;
}
export declare class CreateProjectDto {
    title: string;
    slug?: string;
    category: string;
    client: string;
    duration: string;
    image: string;
    coverMediaId?: string;
    gallery?: string[];
    heroBackground?: string;
    heroLayout?: 'full' | 'container';
    previewHref: string;
    ctaHref: string;
    ctaLabel: string;
    summary: string;
    content?: ProjectBlockDto[];
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    technologies?: string[];
    status?: 'published' | 'draft';
    sortOrder?: number;
}
export declare class UpdateProjectDto extends CreateProjectDto {
}
export {};
