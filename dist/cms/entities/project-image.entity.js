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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectImage = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../../projects/entities/project.entity");
let ProjectImage = class ProjectImage {
};
exports.ProjectImage = ProjectImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProjectImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 36,
        name: 'project_id',
        charset: 'latin1',
        collation: 'latin1_swedish_ci',
    }),
    __metadata("design:type", String)
], ProjectImage.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'project_id' }),
    __metadata("design:type", project_entity_1.Project)
], ProjectImage.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ProjectImage.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 36, nullable: true, name: 'media_id' }),
    __metadata("design:type", String)
], ProjectImage.prototype, "mediaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], ProjectImage.prototype, "alt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32, default: 'gallery' }),
    __metadata("design:type", String)
], ProjectImage.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0, name: 'sort_order' }),
    __metadata("design:type", Number)
], ProjectImage.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProjectImage.prototype, "createdAt", void 0);
exports.ProjectImage = ProjectImage = __decorate([
    (0, typeorm_1.Entity)('project_images')
], ProjectImage);
//# sourceMappingURL=project-image.entity.js.map