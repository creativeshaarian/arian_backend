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
exports.SettingsAdminController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const settings_service_1 = require("./settings.service");
const settings_dto_1 = require("./dto/settings.dto");
let SettingsAdminController = class SettingsAdminController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    findAll() {
        return this.settingsService.getPublicSettings();
    }
    updateSite(dto) {
        return this.settingsService.updateSiteMeta(dto);
    }
    updateSections(dto) {
        return this.settingsService.updateSectionVisibility(dto.sections, dto.order);
    }
};
exports.SettingsAdminController = SettingsAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingsAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [settings_dto_1.UpdateSiteMetaDto]),
    __metadata("design:returntype", void 0)
], SettingsAdminController.prototype, "updateSite", null);
__decorate([
    (0, common_1.Put)('sections'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [settings_dto_1.UpdateSectionVisibilityDto]),
    __metadata("design:returntype", void 0)
], SettingsAdminController.prototype, "updateSections", null);
exports.SettingsAdminController = SettingsAdminController = __decorate([
    (0, common_1.Controller)('admin/settings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsAdminController);
//# sourceMappingURL=settings-admin.controller.js.map