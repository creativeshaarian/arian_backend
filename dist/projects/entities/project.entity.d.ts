export declare class Project {
    id: string;
    slug: string;
    title: string;
    category: string;
    client: string;
    duration: string;
    image: string;
    coverMediaId?: string;
    gallery: string[];
    heroBackground?: string;
    heroLayout?: 'full' | 'container';
    previewHref: string;
    ctaHref: string;
    ctaLabel: string;
    summary: string;
    content: Array<{
        type: string;
        text: string;
    }>;
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    technologies?: string[];
    status: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
