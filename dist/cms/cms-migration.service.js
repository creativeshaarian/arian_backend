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
exports.CmsMigrationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const content_section_entity_1 = require("../content/entities/content-section.entity");
const site_setting_entity_1 = require("./entities/site-setting.entity");
const navbar_item_entity_1 = require("./entities/navbar-item.entity");
const hero_setting_entity_1 = require("./entities/hero-setting.entity");
const about_setting_entity_1 = require("./entities/about-setting.entity");
const service_item_entity_1 = require("./entities/service-item.entity");
const stack_item_entity_1 = require("./entities/stack-item.entity");
const skill_item_entity_1 = require("./entities/skill-item.entity");
const experience_item_entity_1 = require("./entities/experience-item.entity");
const social_link_entity_1 = require("./entities/social-link.entity");
const contact_setting_entity_1 = require("./entities/contact-setting.entity");
const footer_setting_entity_1 = require("./entities/footer-setting.entity");
const footer_nav_link_entity_1 = require("./entities/footer-nav-link.entity");
const testimonial_entity_1 = require("./entities/testimonial.entity");
const pricing_plan_entity_1 = require("./entities/pricing-plan.entity");
let CmsMigrationService = class CmsMigrationService {
    constructor(contentRepo, siteSettingRepo, heroRepo, navbarItemRepo, aboutRepo, serviceRepo, stackRepo, skillRepo, experienceRepo, socialRepo, contactRepo, footerRepo, footerNavRepo, testimonialRepo, pricingRepo) {
        this.contentRepo = contentRepo;
        this.siteSettingRepo = siteSettingRepo;
        this.heroRepo = heroRepo;
        this.navbarItemRepo = navbarItemRepo;
        this.aboutRepo = aboutRepo;
        this.serviceRepo = serviceRepo;
        this.stackRepo = stackRepo;
        this.skillRepo = skillRepo;
        this.experienceRepo = experienceRepo;
        this.socialRepo = socialRepo;
        this.contactRepo = contactRepo;
        this.footerRepo = footerRepo;
        this.footerNavRepo = footerNavRepo;
        this.testimonialRepo = testimonialRepo;
        this.pricingRepo = pricingRepo;
    }
    async onModuleInit() {
        await this.ensureCmsMigratedFlag();
        const heroCount = await this.heroRepo.count();
        if (heroCount > 0)
            return;
        await this.migrateFromContentSections();
    }
    async ensureCmsMigratedFlag() {
        const flag = await this.siteSettingRepo.findOne({
            where: { key: 'cms_migrated' },
        });
        if (flag)
            return;
        const heroCount = await this.heroRepo.count();
        if (heroCount === 0)
            return;
        const existing = await this.siteSettingRepo.findOne({
            where: { key: 'cms_migrated' },
        });
        if (existing)
            return;
        await this.siteSettingRepo.save(this.siteSettingRepo.create({
            key: 'cms_migrated',
            value: {
                migratedAt: new Date().toISOString(),
                version: 2,
                source: 'auto-detect',
            },
        }));
    }
    async migrateFromContentSections() {
        const rows = await this.contentRepo.find();
        const content = {};
        for (const row of rows) {
            content[row.key] = row.data;
        }
        if (Object.keys(content).length === 0)
            return;
        if (content.site) {
            await this.siteSettingRepo.save({
                key: 'site',
                value: content.site,
            });
        }
        if (content.hero) {
            const hero = content.hero;
            await this.heroRepo.save(this.heroRepo.create({
                greeting: hero.greeting,
                name: hero.name,
                marqueeName: hero.marqueeName,
                profileImage: hero.profileImage,
                profileAlt: hero.profileAlt,
                ctaText: hero.ctaText,
                ctaHref: hero.ctaHref,
            }));
        }
        if (Array.isArray(content.navLinks)) {
            await this.navbarItemRepo.clear();
            const items = content.navLinks.map((link, index) => this.navbarItemRepo.create({
                label: link.label,
                href: link.href,
                sortOrder: index,
                status: 'published',
            }));
            if (items.length)
                await this.navbarItemRepo.save(items);
        }
        if (content.about) {
            const about = content.about;
            await this.aboutRepo.save(this.aboutRepo.create({
                heading: about.heading,
                text: about.text,
            }));
        }
        if (Array.isArray(content.services)) {
            await this.serviceRepo.clear();
            const services = content.services.map((item, index) => this.serviceRepo.create({
                number: item.number,
                title: item.title,
                description: item.description,
                shapeImage: item.shape,
                shapeAlt: item.shapeAlt,
                rotate: item.rotate,
                sortOrder: index,
                status: 'published',
            }));
            if (services.length)
                await this.serviceRepo.save(services);
        }
        if (Array.isArray(content.stack)) {
            await this.stackRepo.clear();
            const stack = content.stack.map((item, index) => this.stackRepo.create({
                name: item.name,
                description: item.description,
                sortOrder: index,
                status: 'published',
            }));
            if (stack.length)
                await this.stackRepo.save(stack);
        }
        if (Array.isArray(content.skills)) {
            await this.skillRepo.clear();
            const skills = content.skills.map((name, index) => this.skillRepo.create({ name, sortOrder: index, status: 'published' }));
            if (skills.length)
                await this.skillRepo.save(skills);
        }
        if (content.experience) {
            const exp = content.experience;
            await this.siteSettingRepo.save({
                key: 'experience_meta',
                value: { cvHref: exp.cvHref ?? '#' },
            });
            if (Array.isArray(exp.items)) {
                await this.experienceRepo.clear();
                const items = exp.items.map((item, index) => this.experienceRepo.create({
                    slug: item.id,
                    duration: item.duration,
                    position: item.position,
                    company: item.company,
                    description: item.description,
                    hoverImage: item.hoverImage,
                    hoverImageAlt: item.hoverImageAlt,
                    sortOrder: index,
                    status: 'published',
                }));
                if (items.length)
                    await this.experienceRepo.save(items);
            }
        }
        if (Array.isArray(content.socialLinks)) {
            await this.socialRepo.clear();
            const links = content.socialLinks.map((link, index) => this.socialRepo.create({
                label: link.label,
                href: link.href,
                platform: link.platform,
                location: 'hero',
                sortOrder: index,
                status: 'published',
            }));
            if (links.length)
                await this.socialRepo.save(links);
        }
        if (content.footer) {
            const footer = content.footer;
            const image = footer.image;
            const contact = footer.contact;
            await this.footerRepo.save(this.footerRepo.create({
                title: footer.title,
                description: footer.description,
                imageUrl: image?.src,
                imageAlt: image?.alt,
                copyright: footer.copyright,
            }));
            if (contact) {
                await this.contactRepo.save(this.contactRepo.create({
                    email: contact.email,
                    phone: contact.phone,
                    phoneHref: contact.phoneHref,
                    emailHref: contact.emailHref,
                }));
            }
            if (Array.isArray(footer.navLinks)) {
                await this.footerNavRepo.clear();
                const navLinks = footer.navLinks.map((link, index) => this.footerNavRepo.create({
                    label: link.label,
                    href: link.href,
                    sortOrder: index,
                    status: 'published',
                }));
                if (navLinks.length)
                    await this.footerNavRepo.save(navLinks);
            }
            if (Array.isArray(footer.socialLinks)) {
                const footerSocials = footer.socialLinks.map((link, index) => this.socialRepo.create({
                    label: link.label,
                    href: link.href,
                    platform: link.icon,
                    location: 'footer',
                    sortOrder: index,
                    status: 'published',
                }));
                if (footerSocials.length)
                    await this.socialRepo.save(footerSocials);
            }
        }
        if (Array.isArray(content.testimonials)) {
            await this.testimonialRepo.clear();
            const items = content.testimonials.map((item, index) => this.testimonialRepo.create({
                name: item.name,
                role: item.role,
                quote: item.quote,
                avatar: item.avatar,
                sortOrder: index,
                status: 'published',
            }));
            if (items.length)
                await this.testimonialRepo.save(items);
        }
        if (Array.isArray(content.pricingPlans)) {
            await this.pricingRepo.clear();
            const plans = content.pricingPlans.map((plan, index) => this.pricingRepo.create({
                name: plan.name,
                tagline: plan.tagline,
                price: plan.price,
                featured: plan.featured ?? false,
                features: plan.features,
                sortOrder: index,
                status: 'published',
            }));
            if (plans.length)
                await this.pricingRepo.save(plans);
        }
        await this.siteSettingRepo.save({
            key: 'cms_migrated',
            value: { migratedAt: new Date().toISOString(), version: 1 },
        });
        await this.siteSettingRepo.save({
            key: 'section_visibility',
            value: {
                hero: true,
                about: true,
                services: true,
                stack: true,
                experience: true,
                projects: true,
                blog: true,
                contact: true,
                footer: true,
            },
        });
    }
};
exports.CmsMigrationService = CmsMigrationService;
exports.CmsMigrationService = CmsMigrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(content_section_entity_1.ContentSection)),
    __param(1, (0, typeorm_1.InjectRepository)(site_setting_entity_1.SiteSetting)),
    __param(2, (0, typeorm_1.InjectRepository)(hero_setting_entity_1.HeroSetting)),
    __param(3, (0, typeorm_1.InjectRepository)(navbar_item_entity_1.NavbarItem)),
    __param(4, (0, typeorm_1.InjectRepository)(about_setting_entity_1.AboutSetting)),
    __param(5, (0, typeorm_1.InjectRepository)(service_item_entity_1.ServiceItem)),
    __param(6, (0, typeorm_1.InjectRepository)(stack_item_entity_1.StackItem)),
    __param(7, (0, typeorm_1.InjectRepository)(skill_item_entity_1.SkillItem)),
    __param(8, (0, typeorm_1.InjectRepository)(experience_item_entity_1.ExperienceItem)),
    __param(9, (0, typeorm_1.InjectRepository)(social_link_entity_1.SocialLink)),
    __param(10, (0, typeorm_1.InjectRepository)(contact_setting_entity_1.ContactSetting)),
    __param(11, (0, typeorm_1.InjectRepository)(footer_setting_entity_1.FooterSetting)),
    __param(12, (0, typeorm_1.InjectRepository)(footer_nav_link_entity_1.FooterNavLink)),
    __param(13, (0, typeorm_1.InjectRepository)(testimonial_entity_1.Testimonial)),
    __param(14, (0, typeorm_1.InjectRepository)(pricing_plan_entity_1.PricingPlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CmsMigrationService);
//# sourceMappingURL=cms-migration.service.js.map