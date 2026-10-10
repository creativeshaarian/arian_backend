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
exports.AboutSetting = void 0;
const typeorm_1 = require("typeorm");
let AboutSetting = class AboutSetting {
};
exports.AboutSetting = AboutSetting;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AboutSetting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], AboutSetting.prototype, "heading", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AboutSetting.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'profile_image' }),
    __metadata("design:type", String)
], AboutSetting.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'experience_years' }),
    __metadata("design:type", Number)
], AboutSetting.prototype, "experienceYears", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], AboutSetting.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], AboutSetting.prototype, "updatedAt", void 0);
exports.AboutSetting = AboutSetting = __decorate([
    (0, typeorm_1.Entity)('about_settings')
], AboutSetting);
//# sourceMappingURL=about-setting.entity.js.map