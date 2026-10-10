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
exports.SocialLink = void 0;
const typeorm_1 = require("typeorm");
let SocialLink = class SocialLink {
};
exports.SocialLink = SocialLink;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SocialLink.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 128 }),
    __metadata("design:type", String)
], SocialLink.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], SocialLink.prototype, "href", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 64, default: 'custom' }),
    __metadata("design:type", String)
], SocialLink.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'icon_url' }),
    __metadata("design:type", String)
], SocialLink.prototype, "iconUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 36, nullable: true, name: 'icon_media_id' }),
    __metadata("design:type", String)
], SocialLink.prototype, "iconMediaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32, default: 'hero' }),
    __metadata("design:type", String)
], SocialLink.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0, name: 'sort_order' }),
    __metadata("design:type", Number)
], SocialLink.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32, default: 'published' }),
    __metadata("design:type", String)
], SocialLink.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SocialLink.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SocialLink.prototype, "updatedAt", void 0);
exports.SocialLink = SocialLink = __decorate([
    (0, typeorm_1.Entity)('social_links')
], SocialLink);
//# sourceMappingURL=social-link.entity.js.map