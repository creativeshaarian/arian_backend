import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<import("../common/serializers/project.serializer").CmsProject[]>;
    findOne(slug: string): Promise<import("../common/serializers/project.serializer").CmsProjectDetail>;
}
