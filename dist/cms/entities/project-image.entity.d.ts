import { Project } from '../../projects/entities/project.entity';
export declare class ProjectImage {
    id: string;
    projectId: string;
    project: Project;
    url: string;
    mediaId?: string;
    alt?: string;
    type: 'cover' | 'gallery' | 'hero';
    sortOrder: number;
    createdAt: Date;
}
