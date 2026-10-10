import { ProjectsService } from './projects.service';
import { ProjectImagesService } from './project-images.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddProjectImageDto } from '../cms/admin/dto/cms-admin.dto';
export declare class ProjectsAdminController {
    private readonly projectsService;
    private readonly projectImagesService;
    constructor(projectsService: ProjectsService, projectImagesService: ProjectImagesService);
    findAll(): Promise<import("../common/serializers/project.serializer").CmsProject[]>;
    addImage(id: string, dto: AddProjectImageDto): Promise<import("../cms/entities/project-image.entity").ProjectImage>;
    removeImage(id: string, imageId: string): Promise<{
        success: boolean;
    }>;
    findOne(id: string): Promise<{
        images: import("../cms/entities/project-image.entity").ProjectImage[];
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
        heroLayout?: "full" | "container";
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
    }>;
    create(dto: CreateProjectDto): Promise<import("../common/serializers/project.serializer").CmsProject>;
    update(id: string, dto: UpdateProjectDto): Promise<import("../common/serializers/project.serializer").CmsProject>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
