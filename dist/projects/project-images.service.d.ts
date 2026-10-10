import { Repository } from 'typeorm';
import { ProjectImage } from '../cms/entities/project-image.entity';
import { Project } from './entities/project.entity';
import { MediaRelationService } from '../media/media-relation.service';
import { AddProjectImageDto } from '../cms/admin/dto/cms-admin.dto';
export declare class ProjectImagesService {
    private readonly imageRepo;
    private readonly projectRepo;
    private readonly mediaRelationService;
    constructor(imageRepo: Repository<ProjectImage>, projectRepo: Repository<Project>, mediaRelationService: MediaRelationService);
    findByProjectId(projectId: string): Promise<ProjectImage[]>;
    addImage(projectId: string, dto: AddProjectImageDto): Promise<ProjectImage>;
    removeImage(projectId: string, imageId: string): Promise<{
        success: boolean;
    }>;
    syncProjectGallery(projectId: string): Promise<string[]>;
    getGalleryUrls(images: ProjectImage[]): string[];
}
