"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const content_section_entity_1 = require("../content/entities/content-section.entity");
const cms_aggregator_service_1 = require("./cms-aggregator.service");
const cms_normalized_service_1 = require("./cms-normalized.service");
const cms_migration_service_1 = require("./cms-migration.service");
const cms_admin_service_1 = require("./admin/cms-admin.service");
const cms_admin_controllers_1 = require("./admin/cms-admin.controllers");
const cache_admin_controller_1 = require("./admin/cache-admin.controller");
const projects_module_1 = require("../projects/projects.module");
const blog_module_1 = require("../blog/blog.module");
const media_module_1 = require("../media/media.module");
const settings_module_1 = require("../settings/settings.module");
const site_setting_entity_1 = require("./entities/site-setting.entity");
const navbar_setting_entity_1 = require("./entities/navbar-setting.entity");
const navbar_item_entity_1 = require("./entities/navbar-item.entity");
const hero_setting_entity_1 = require("./entities/hero-setting.entity");
const about_setting_entity_1 = require("./entities/about-setting.entity");
const service_item_entity_1 = require("./entities/service-item.entity");
const stack_item_entity_1 = require("./entities/stack-item.entity");
const skill_item_entity_1 = require("./entities/skill-item.entity");
const experience_item_entity_1 = require("./entities/experience-item.entity");
const project_image_entity_1 = require("./entities/project-image.entity");
const social_link_entity_1 = require("./entities/social-link.entity");
const contact_setting_entity_1 = require("./entities/contact-setting.entity");
const footer_setting_entity_1 = require("./entities/footer-setting.entity");
const footer_nav_link_entity_1 = require("./entities/footer-nav-link.entity");
const testimonial_entity_1 = require("./entities/testimonial.entity");
const certification_item_entity_1 = require("./entities/certification-item.entity");
const pricing_plan_entity_1 = require("./entities/pricing-plan.entity");
const cmsEntities = [
    site_setting_entity_1.SiteSetting,
    navbar_setting_entity_1.NavbarSetting,
    navbar_item_entity_1.NavbarItem,
    hero_setting_entity_1.HeroSetting,
    about_setting_entity_1.AboutSetting,
    service_item_entity_1.ServiceItem,
    stack_item_entity_1.StackItem,
    skill_item_entity_1.SkillItem,
    experience_item_entity_1.ExperienceItem,
    project_image_entity_1.ProjectImage,
    social_link_entity_1.SocialLink,
    contact_setting_entity_1.ContactSetting,
    footer_setting_entity_1.FooterSetting,
    footer_nav_link_entity_1.FooterNavLink,
    testimonial_entity_1.Testimonial,
    certification_item_entity_1.CertificationItem,
    pricing_plan_entity_1.PricingPlan,
];
let CmsModule = class CmsModule {
};
exports.CmsModule = CmsModule;
exports.CmsModule = CmsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([content_section_entity_1.ContentSection, ...cmsEntities]),
            projects_module_1.ProjectsModule,
            blog_module_1.BlogModule,
            media_module_1.MediaModule,
            settings_module_1.SettingsModule,
        ],
        controllers: [
            cms_admin_controllers_1.NavbarAdminController,
            cms_admin_controllers_1.HeroAdminController,
            cms_admin_controllers_1.AboutAdminController,
            cms_admin_controllers_1.ServicesAdminController,
            cms_admin_controllers_1.StackAdminController,
            cms_admin_controllers_1.SkillsAdminController,
            cms_admin_controllers_1.ExperienceAdminController,
            cms_admin_controllers_1.SocialLinksAdminController,
            cms_admin_controllers_1.ContactAdminController,
            cms_admin_controllers_1.FooterAdminController,
            cms_admin_controllers_1.TestimonialsAdminController,
            cms_admin_controllers_1.CertificationsAdminController,
            cms_admin_controllers_1.PricingAdminController,
            cache_admin_controller_1.CacheAdminController,
        ],
        providers: [
            cms_aggregator_service_1.CmsAggregatorService,
            cms_normalized_service_1.CmsNormalizedService,
            cms_migration_service_1.CmsMigrationService,
            cms_admin_service_1.CmsAdminService,
        ],
        exports: [
            cms_aggregator_service_1.CmsAggregatorService,
            cms_normalized_service_1.CmsNormalizedService,
            cms_migration_service_1.CmsMigrationService,
            cms_admin_service_1.CmsAdminService,
        ],
    })
], CmsModule);
//# sourceMappingURL=cms.module.js.map