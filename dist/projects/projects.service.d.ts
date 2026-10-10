import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CmsProject } from '../common/serializers/project.serializer';
import { ProjectImagesService } from './project-images.service';
import { MediaRelationService } from '../media/media-relation.service';
type ProjectInput = {
    slug: string;
    title: string;
    category: string;
    client: string;
    duration: string;
    image: string;
    gallery?: string[];
    heroBackground?: string;
    heroLayout?: 'full' | 'container';
    previewHref: string;
    ctaHref: string;
    ctaLabel: string;
    summary: string;
    content?: Array<{
        type: string;
        text: string;
    }>;
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    technologies?: string[];
    status?: string;
};
export declare class ProjectsService {
    private readonly repo;
    private readonly projectImagesService;
    private readonly mediaRelationService;
    constructor(repo: Repository<Project>, projectImagesService: ProjectImagesService, mediaRelationService: MediaRelationService);
    findAll(includeDrafts?: boolean): Promise<CmsProject[]>;
    findAllForCms(): Promise<CmsProject[]>;
    findBySlug(slug: string): Promise<import("../common/serializers/project.serializer").CmsProjectDetail>;
    findEntityById(id: string): Promise<Project>;
    create(dto: CreateProjectDto): Promise<CmsProject>;
    update(id: string, dto: UpdateProjectDto): Promise<CmsProject>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    syncFromContent(items: ProjectInput[]): Promise<void>;
    private projectInputToEntityData;
    private syncProjectGalleryFromContent;
}
export {};
