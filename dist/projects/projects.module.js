"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./entities/project.entity");
const projects_service_1 = require("./projects.service");
const projects_controller_1 = require("./projects.controller");
const projects_admin_controller_1 = require("./projects-admin.controller");
const project_images_service_1 = require("./project-images.service");
const project_image_entity_1 = require("../cms/entities/project-image.entity");
const media_module_1 = require("../media/media.module");
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project, project_image_entity_1.ProjectImage]),
            media_module_1.MediaModule,
        ],
        controllers: [projects_controller_1.ProjectsController, projects_admin_controller_1.ProjectsAdminController],
        providers: [projects_service_1.ProjectsService, project_images_service_1.ProjectImagesService],
        exports: [projects_service_1.ProjectsService, project_images_service_1.ProjectImagesService],
    })
], ProjectsModule);
//# sourceMappingURL=projects.module.js.map