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
exports.PricingAdminController = exports.CertificationsAdminController = exports.TestimonialsAdminController = exports.FooterAdminController = exports.ContactAdminController = exports.SocialLinksAdminController = exports.ExperienceAdminController = exports.SkillsAdminController = exports.StackAdminController = exports.ServicesAdminController = exports.AboutAdminController = exports.HeroAdminController = exports.NavbarAdminController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const cms_admin_service_1 = require("./cms-admin.service");
const cms_admin_dto_1 = require("./dto/cms-admin.dto");
let NavbarAdminController = class NavbarAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll() {
        return this.cms.getNavbar();
    }
    updateSettings(dto) {
        return this.cms.updateNavbarSettings(dto);
    }
    createItem(dto) {
        return this.cms.createNavbarItem(dto);
    }
    updateItem(id, dto) {
        return this.cms.updateNavbarItem(id, dto);
    }
    deleteItem(id) {
        return this.cms.deleteNavbarItem(id);
    }
};
exports.NavbarAdminController = NavbarAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NavbarAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)('settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.UpdateNavbarSettingsDto]),
    __metadata("design:returntype", void 0)
], NavbarAdminController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.CreateNavbarItemDto]),
    __metadata("design:returntype", void 0)
], NavbarAdminController.prototype, "createItem", null);
__decorate([
    (0, common_1.Put)('items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_admin_dto_1.UpdateNavbarItemDto]),
    __metadata("design:returntype", void 0)
], NavbarAdminController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NavbarAdminController.prototype, "deleteItem", null);
exports.NavbarAdminController = NavbarAdminController = __decorate([
    (0, common_1.Controller)('admin/navbar'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], NavbarAdminController);
let HeroAdminController = class HeroAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll() {
        return this.cms.getHero();
    }
    update(dto) {
        return this.cms.updateHero(dto);
    }
};
exports.HeroAdminController = HeroAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HeroAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.UpdateHeroDto]),
    __metadata("design:returntype", void 0)
], HeroAdminController.prototype, "update", null);
exports.HeroAdminController = HeroAdminController = __decorate([
    (0, common_1.Controller)('admin/hero'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], HeroAdminController);
let AboutAdminController = class AboutAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll() {
        return this.cms.getAbout();
    }
    update(dto) {
        return this.cms.updateAbout(dto);
    }
};
exports.AboutAdminController = AboutAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AboutAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.UpdateAboutDto]),
    __metadata("design:returntype", void 0)
], AboutAdminController.prototype, "update", null);
exports.AboutAdminController = AboutAdminController = __decorate([
    (0, common_1.Controller)('admin/about'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], AboutAdminController);
let ServicesAdminController = class ServicesAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll() {
        return this.cms.getServices();
    }
    create(dto) {
        return this.cms.createService(dto);
    }
    update(id, dto) {
        return this.cms.updateService(id, dto);
    }
    remove(id) {
        return this.cms.deleteService(id);
    }
};
exports.ServicesAdminController = ServicesAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServicesAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.CreateServiceItemDto]),
    __metadata("design:returntype", void 0)
], ServicesAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_admin_dto_1.UpdateServiceItemDto]),
    __metadata("design:returntype", void 0)
], ServicesAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesAdminController.prototype, "remove", null);
exports.ServicesAdminController = ServicesAdminController = __decorate([
    (0, common_1.Controller)('admin/services'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], ServicesAdminController);
let StackAdminController = class StackAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll() {
        return this.cms.getStack();
    }
    create(dto) {
        return this.cms.createStackItem(dto);
    }
    update(id, dto) {
        return this.cms.updateStackItem(id, dto);
    }
    remove(id) {
        return this.cms.deleteStackItem(id);
    }
};
exports.StackAdminController = StackAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StackAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.CreateStackItemDto]),
    __metadata("design:returntype", void 0)
], StackAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_admin_dto_1.UpdateStackItemDto]),
    __metadata("design:returntype", void 0)
], StackAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StackAdminController.prototype, "remove", null);
exports.StackAdminController = StackAdminController = __decorate([
    (0, common_1.Controller)('admin/stack'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], StackAdminController);
let SkillsAdminController = class SkillsAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll() {
        return this.cms.getSkills();
    }
    create(dto) {
        return this.cms.createSkill(dto);
    }
    update(id, dto) {
        return this.cms.updateSkill(id, dto);
    }
    remove(id) {
        return this.cms.deleteSkill(id);
    }
};
exports.SkillsAdminController = SkillsAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SkillsAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.CreateSkillItemDto]),
    __metadata("design:returntype", void 0)
], SkillsAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_admin_dto_1.UpdateSkillItemDto]),
    __metadata("design:returntype", void 0)
], SkillsAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SkillsAdminController.prototype, "remove", null);
exports.SkillsAdminController = SkillsAdminController = __decorate([
    (0, common_1.Controller)('admin/skills'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], SkillsAdminController);
let ExperienceAdminController = class ExperienceAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll() {
        return this.cms.getExperience();
    }
    updateMeta(dto) {
        return this.cms.updateExperienceMeta(dto);
    }
    createItem(dto) {
        return this.cms.createExperienceItem(dto);
    }
    updateItem(id, dto) {
        return this.cms.updateExperienceItem(id, dto);
    }
    deleteItem(id) {
        return this.cms.deleteExperienceItem(id);
    }
};
exports.ExperienceAdminController = ExperienceAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExperienceAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)('meta'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.UpdateExperienceMetaDto]),
    __metadata("design:returntype", void 0)
], ExperienceAdminController.prototype, "updateMeta", null);
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.CreateExperienceItemDto]),
    __metadata("design:returntype", void 0)
], ExperienceAdminController.prototype, "createItem", null);
__decorate([
    (0, common_1.Put)('items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_admin_dto_1.UpdateExperienceItemDto]),
    __metadata("design:returntype", void 0)
], ExperienceAdminController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExperienceAdminController.prototype, "deleteItem", null);
exports.ExperienceAdminController = ExperienceAdminController = __decorate([
    (0, common_1.Controller)('admin/experience'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], ExperienceAdminController);
let SocialLinksAdminController = class SocialLinksAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll(location) {
        return this.cms.getSocialLinks(location);
    }
    create(dto) {
        return this.cms.createSocialLink(dto);
    }
    update(id, dto) {
        return this.cms.updateSocialLink(id, dto);
    }
    remove(id) {
        return this.cms.deleteSocialLink(id);
    }
};
exports.SocialLinksAdminController = SocialLinksAdminController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SocialLinksAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.CreateSocialLinkDto]),
    __metadata("design:returntype", void 0)
], SocialLinksAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_admin_dto_1.UpdateSocialLinkDto]),
    __metadata("design:returntype", void 0)
], SocialLinksAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SocialLinksAdminController.prototype, "remove", null);
exports.SocialLinksAdminController = SocialLinksAdminController = __decorate([
    (0, common_1.Controller)('admin/social-links'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], SocialLinksAdminController);
let ContactAdminController = class ContactAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll() {
        return this.cms.getContact();
    }
    update(dto) {
        return this.cms.updateContact(dto);
    }
};
exports.ContactAdminController = ContactAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContactAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.UpdateContactDto]),
    __metadata("design:returntype", void 0)
], ContactAdminController.prototype, "update", null);
exports.ContactAdminController = ContactAdminController = __decorate([
    (0, common_1.Controller)('admin/contact'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], ContactAdminController);
let FooterAdminController = class FooterAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll() {
        return this.cms.getFooter();
    }
    updateSettings(dto) {
        return this.cms.updateFooter(dto);
    }
    createNavLink(dto) {
        return this.cms.createFooterNavLink(dto);
    }
    updateNavLink(id, dto) {
        return this.cms.updateFooterNavLink(id, dto);
    }
    deleteNavLink(id) {
        return this.cms.deleteFooterNavLink(id);
    }
};
exports.FooterAdminController = FooterAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FooterAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)('settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.UpdateFooterDto]),
    __metadata("design:returntype", void 0)
], FooterAdminController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Post)('nav-links'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.CreateFooterNavLinkDto]),
    __metadata("design:returntype", void 0)
], FooterAdminController.prototype, "createNavLink", null);
__decorate([
    (0, common_1.Put)('nav-links/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_admin_dto_1.UpdateFooterNavLinkDto]),
    __metadata("design:returntype", void 0)
], FooterAdminController.prototype, "updateNavLink", null);
__decorate([
    (0, common_1.Delete)('nav-links/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FooterAdminController.prototype, "deleteNavLink", null);
exports.FooterAdminController = FooterAdminController = __decorate([
    (0, common_1.Controller)('admin/footer'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], FooterAdminController);
let TestimonialsAdminController = class TestimonialsAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll() {
        return this.cms.getTestimonials();
    }
    create(dto) {
        return this.cms.createTestimonial(dto);
    }
    update(id, dto) {
        return this.cms.updateTestimonial(id, dto);
    }
    remove(id) {
        return this.cms.deleteTestimonial(id);
    }
};
exports.TestimonialsAdminController = TestimonialsAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestimonialsAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.CreateTestimonialDto]),
    __metadata("design:returntype", void 0)
], TestimonialsAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_admin_dto_1.UpdateTestimonialDto]),
    __metadata("design:returntype", void 0)
], TestimonialsAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestimonialsAdminController.prototype, "remove", null);
exports.TestimonialsAdminController = TestimonialsAdminController = __decorate([
    (0, common_1.Controller)('admin/testimonials'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], TestimonialsAdminController);
let CertificationsAdminController = class CertificationsAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll() {
        return this.cms.getCertifications();
    }
    create(dto) {
        return this.cms.createCertification(dto);
    }
    update(id, dto) {
        return this.cms.updateCertification(id, dto);
    }
    remove(id) {
        return this.cms.deleteCertification(id);
    }
};
exports.CertificationsAdminController = CertificationsAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CertificationsAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.CreateCertificationDto]),
    __metadata("design:returntype", void 0)
], CertificationsAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_admin_dto_1.UpdateCertificationDto]),
    __metadata("design:returntype", void 0)
], CertificationsAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificationsAdminController.prototype, "remove", null);
exports.CertificationsAdminController = CertificationsAdminController = __decorate([
    (0, common_1.Controller)('admin/certifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], CertificationsAdminController);
let PricingAdminController = class PricingAdminController {
    constructor(cms) {
        this.cms = cms;
    }
    findAll() {
        return this.cms.getPricing();
    }
    create(dto) {
        return this.cms.createPricingPlan(dto);
    }
    update(id, dto) {
        return this.cms.updatePricingPlan(id, dto);
    }
    remove(id) {
        return this.cms.deletePricingPlan(id);
    }
};
exports.PricingAdminController = PricingAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PricingAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_admin_dto_1.CreatePricingPlanDto]),
    __metadata("design:returntype", void 0)
], PricingAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_admin_dto_1.UpdatePricingPlanDto]),
    __metadata("design:returntype", void 0)
], PricingAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PricingAdminController.prototype, "remove", null);
exports.PricingAdminController = PricingAdminController = __decorate([
    (0, common_1.Controller)('admin/pricing'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cms_admin_service_1.CmsAdminService])
], PricingAdminController);
//# sourceMappingURL=cms-admin.controllers.js.map