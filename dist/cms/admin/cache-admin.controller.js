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
exports.CacheAdminController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let CacheAdminController = class CacheAdminController {
    clear() {
        return {
            success: true,
            clearedAt: new Date().toISOString(),
            message: 'Backend cache clear acknowledged',
        };
    }
};
exports.CacheAdminController = CacheAdminController;
__decorate([
    (0, common_1.Post)('clear'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CacheAdminController.prototype, "clear", null);
exports.CacheAdminController = CacheAdminController = __decorate([
    (0, common_1.Controller)('admin/cache'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)
], CacheAdminController);
//# sourceMappingURL=cache-admin.controller.js.map