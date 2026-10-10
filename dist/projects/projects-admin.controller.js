"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsAdminController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const projects_service_1 = require("./projects.service");
const project_images_service_1 = require("./project-images.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const cms_admin_dto_1 = require("../cms/admin/dto/cms-admin.dto");
let ProjectsAdminController = class ProjectsAdminController {
    constructor(projectsService, projectImagesService) {
        this.projectsService = projectsService;
        this.projectImagesService = projectImagesService;
    }
    findAll() {
        return this.projectsService.findAll(true);
    }
    addImage(id, dto) {
        return this.projectImagesService.addImage(id, dto);
    }
    removeImage(id, imageId) {
        return this.projectImagesService.removeImage(id, imageId);
    }
    async findOne(id) {
        const project = await this.projectsService.findEntityById(id);
        const images = await this.projectImagesService.findByProjectId(id);
        return { ...project, images };
    }
    create(dto) {
        return this.projectsService.create(dto);
    }
    update(id, dto) {
        return this.projectsService.update(id, dto);
    }
    remove(id) {
        return this.projectsService.remove(id);
    }
};
exports.ProjectsAdminController = ProjectsAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':id/images'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_admin_dto_1.AddProjectImageDto]),
    __metadata("design:returntype", void 0)
], ProjectsAdminController.prototype, "addImage", null);
__decorate([
    (0, common_1.Delete)(':id/images/:imageId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('imageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectsAdminController.prototype, "removeImage", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsAdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsAdminController.prototype, "remove", null);
exports.ProjectsAdminController = ProjectsAdminController = __decorate([
    (0, common_1.Controller)('admin/projects'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService,
        project_images_service_1.ProjectImagesService])
], ProjectsAdminController);
//# sourceMappingURL=projects-admin.controller.js.map