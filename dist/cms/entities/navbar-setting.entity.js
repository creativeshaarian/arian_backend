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
exports.NavbarSetting = void 0;
const typeorm_1 = require("typeorm");
let NavbarSetting = class NavbarSetting {
};
exports.NavbarSetting = NavbarSetting;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NavbarSetting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'logo_image' }),
    __metadata("design:type", String)
], NavbarSetting.prototype, "logoImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 128, nullable: true, name: 'logo_text' }),
    __metadata("design:type", String)
], NavbarSetting.prototype, "logoText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 128, nullable: true, name: 'cta_text' }),
    __metadata("design:type", String)
], NavbarSetting.prototype, "ctaText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'cta_href' }),
    __metadata("design:type", String)
], NavbarSetting.prototype, "ctaHref", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], NavbarSetting.prototype, "updatedAt", void 0);
exports.NavbarSetting = NavbarSetting = __decorate([
    (0, typeorm_1.Entity)('navbar_settings')
], NavbarSetting);
//# sourceMappingURL=navbar-setting.entity.js.map