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
exports.HeroSetting = void 0;
const typeorm_1 = require("typeorm");
let HeroSetting = class HeroSetting {
};
exports.HeroSetting = HeroSetting;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], HeroSetting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 128, nullable: true }),
    __metadata("design:type", String)
], HeroSetting.prototype, "greeting", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], HeroSetting.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, name: 'marquee_name' }),
    __metadata("design:type", String)
], HeroSetting.prototype, "marqueeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'profile_image' }),
    __metadata("design:type", String)
], HeroSetting.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, name: 'profile_alt' }),
    __metadata("design:type", String)
], HeroSetting.prototype, "profileAlt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 128, nullable: true, name: 'cta_text' }),
    __metadata("design:type", String)
], HeroSetting.prototype, "ctaText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'cta_href' }),
    __metadata("design:type", String)
], HeroSetting.prototype, "ctaHref", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 512, nullable: true, name: 'cta_icon' }),
    __metadata("design:type", String)
], HeroSetting.prototype, "ctaIcon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 128, nullable: true, name: 'secondary_cta_text' }),
    __metadata("design:type", String)
], HeroSetting.prototype, "secondaryCtaText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'secondary_cta_href' }),
    __metadata("design:type", String)
], HeroSetting.prototype, "secondaryCtaHref", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true, name: 'background_images' }),
    __metadata("design:type", Array)
], HeroSetting.prototype, "backgroundImages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true, name: 'floating_images' }),
    __metadata("design:type", Array)
], HeroSetting.prototype, "floatingImages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], HeroSetting.prototype, "badges", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], HeroSetting.prototype, "statistics", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], HeroSetting.prototype, "updatedAt", void 0);
exports.HeroSetting = HeroSetting = __decorate([
    (0, typeorm_1.Entity)('hero_settings')
], HeroSetting);
//# sourceMappingURL=hero-setting.entity.js.map