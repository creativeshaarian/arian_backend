import { Project } from '../../projects/entities/project.entity';
import { ProjectImage } from '../../cms/entities/project-image.entity';
export type CmsProject = {
    id: string;
    slug: string;
    title: string;
    category: string;
    client: string;
    duration: string;
    image: string;
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
    featured?: boolean;
    technologies?: string[];
};
export type CmsProjectDetail = CmsProject & {
    description: string;
    coverImage: string;
    galleryImages: string[];
};
export declare function serializeProject(project: Project): CmsProject;
export declare function serializeProjectDetail(project: Project, images?: ProjectImage[]): CmsProjectDetail;
