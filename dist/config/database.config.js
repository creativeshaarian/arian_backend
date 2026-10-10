"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = getDatabaseConfig;
const content_section_entity_1 = require("../content/entities/content-section.entity");
const project_entity_1 = require("../projects/entities/project.entity");
const blog_post_entity_1 = require("../blog/entities/blog-post.entity");
const blog_category_entity_1 = require("../blog/entities/blog-category.entity");
const admin_user_entity_1 = require("../auth/entities/admin-user.entity");
const media_asset_entity_1 = require("../media/entities/media-asset.entity");
const media_relation_entity_1 = require("../media/entities/media-relation.entity");
const site_setting_entity_1 = require("../cms/entities/site-setting.entity");
const navbar_setting_entity_1 = require("../cms/entities/navbar-setting.entity");
const navbar_item_entity_1 = require("../cms/entities/navbar-item.entity");
const hero_setting_entity_1 = require("../cms/entities/hero-setting.entity");
const about_setting_entity_1 = require("../cms/entities/about-setting.entity");
const service_item_entity_1 = require("../cms/entities/service-item.entity");
const stack_item_entity_1 = require("../cms/entities/stack-item.entity");
const skill_item_entity_1 = require("../cms/entities/skill-item.entity");
const experience_item_entity_1 = require("../cms/entities/experience-item.entity");
const project_image_entity_1 = require("../cms/entities/project-image.entity");
const social_link_entity_1 = require("../cms/entities/social-link.entity");
const contact_setting_entity_1 = require("../cms/entities/contact-setting.entity");
const footer_setting_entity_1 = require("../cms/entities/footer-setting.entity");
const footer_nav_link_entity_1 = require("../cms/entities/footer-nav-link.entity");
const testimonial_entity_1 = require("../cms/entities/testimonial.entity");
const certification_item_entity_1 = require("../cms/entities/certification-item.entity");
const pricing_plan_entity_1 = require("../cms/entities/pricing-plan.entity");
const entities = [
    content_section_entity_1.ContentSection,
    project_entity_1.Project,
    blog_post_entity_1.BlogPost,
    blog_category_entity_1.BlogCategory,
    admin_user_entity_1.AdminUser,
    media_asset_entity_1.MediaAsset,
    media_relation_entity_1.MediaRelation,
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
function getDatabaseConfig(config) {
    const dbType = config.get('DB_TYPE', 'mysql');
    return {
        type: dbType,
        host: config.get('DB_HOST', 'localhost'),
        port: config.get('DB_PORT', 3306),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE') ||
            config.get('DB_NAME', 'shaarian_db'),
        entities,
        synchronize: config.get('DB_SYNCHRONIZE') === 'true',
        migrations: [`${__dirname}/../migrations/*.js`],
        migrationsRun: config.get('DB_MIGRATIONS_RUN') === 'true',
        logging: config.get('NODE_ENV') === 'development',
        charset: 'utf8mb4',
    };
}
//# sourceMappingURL=database.config.js.map