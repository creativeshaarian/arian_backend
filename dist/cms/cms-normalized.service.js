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
exports.CmsNormalizedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const site_setting_entity_1 = require("./entities/site-setting.entity");
const hero_setting_entity_1 = require("./entities/hero-setting.entity");
const navbar_item_entity_1 = require("./entities/navbar-item.entity");
const navbar_setting_entity_1 = require("./entities/navbar-setting.entity");
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
const certification_item_entity_1 = require("./entities/certification-item.entity");
const pricing_plan_entity_1 = require("./entities/pricing-plan.entity");
let CmsNormalizedService = class CmsNormalizedService {
    constructor(siteSettingRepo, heroRepo, navbarItemRepo, navbarSettingRepo, aboutRepo, serviceRepo, stackRepo, skillRepo, experienceRepo, socialRepo, contactRepo, footerRepo, footerNavRepo, testimonialRepo, certificationRepo, pricingRepo) {
        this.siteSettingRepo = siteSettingRepo;
        this.heroRepo = heroRepo;
        this.navbarItemRepo = navbarItemRepo;
        this.navbarSettingRepo = navbarSettingRepo;
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
        this.certificationRepo = certificationRepo;
        this.pricingRepo = pricingRepo;
    }
    async isMigrated() {
        const flag = await this.siteSettingRepo.findOne({
            where: { key: 'cms_migrated' },
        });
        if (flag)
            return true;
        const heroCount = await this.heroRepo.count();
        if (heroCount === 0)
            return false;
        const again = await this.siteSettingRepo.findOne({
            where: { key: 'cms_migrated' },
        });
        if (again)
            return true;
        try {
            await this.siteSettingRepo.save(this.siteSettingRepo.create({
                key: 'cms_migrated',
                value: {
                    migratedAt: new Date().toISOString(),
                    version: 2,
                    source: 'normalized-auto',
                },
            }));
        }
        catch {
        }
        return true;
    }
    async buildPartialContent() {
        const migrated = await this.isMigrated();
        if (!migrated)
            return {};
        const content = {};
        const site = await this.siteSettingRepo.findOne({ where: { key: 'site' } });
        if (site)
            content.site = site.value;
        const hero = await this.heroRepo.findOne({
            order: { updatedAt: 'DESC' },
            where: {},
        });
        if (hero) {
            content.hero = {
                greeting: hero.greeting ?? '',
                name: hero.name ?? '',
                marqueeName: hero.marqueeName ?? '',
                profileImage: hero.profileImage ?? '',
                profileAlt: hero.profileAlt ?? '',
                ctaText: hero.ctaText ?? '',
                ctaHref: hero.ctaHref ?? '',
                ctaIcon: hero.ctaIcon ?? 'whatsapp',
                secondaryCtaText: hero.secondaryCtaText ?? '',
                secondaryCtaHref: hero.secondaryCtaHref ?? '',
                backgroundImages: hero.backgroundImages ?? [],
                floatingImages: hero.floatingImages ?? [],
                badges: hero.badges ?? [],
                statistics: hero.statistics ?? [],
            };
        }
        const navbarSettings = await this.navbarSettingRepo.findOne({
            order: { updatedAt: 'DESC' },
            where: {},
        });
        if (navbarSettings) {
            content.navbar = {
                logoImage: navbarSettings.logoImage ?? '',
                logoText: navbarSettings.logoText ?? '',
                ctaText: navbarSettings.ctaText ?? '',
                ctaHref: navbarSettings.ctaHref ?? '',
            };
        }
        const navItems = await this.navbarItemRepo.find({
            where: { status: 'published' },
            order: { sortOrder: 'ASC' },
        });
        content.navLinks = navItems
            .filter((item) => (item.placement || 'main') === 'main')
            .map((item) => ({
            label: item.label,
            href: item.href,
        }));
        content.navUtilityLinks = navItems
            .filter((item) => item.placement === 'utility')
            .map((item) => ({
            label: item.label,
            href: item.href,
        }));
        const about = await this.aboutRepo.findOne({
            order: { updatedAt: 'DESC' },
            where: {},
        });
        if (about) {
            content.about = {
                heading: about.heading ?? '',
                text: about.text ?? '',
                profileImage: about.profileImage ?? '',
                experienceYears: about.experienceYears,
            };
        }
        const services = await this.serviceRepo.find({
            where: { status: 'published' },
            order: { sortOrder: 'ASC' },
        });
        content.services = services.map((s) => ({
            id: s.id,
            number: s.number,
            title: s.title,
            description: s.description,
            shape: s.shapeImage ?? '',
            shapeAlt: s.shapeAlt ?? '',
            rotate: s.rotate,
        }));
        const stack = await this.stackRepo.find({
            where: { status: 'published' },
            order: { sortOrder: 'ASC' },
        });
        content.stack = stack.map((s) => ({
            id: s.id,
            name: s.name,
            description: s.description,
            icon: s.icon ?? '',
            category: s.category ?? '',
            progress: s.progress,
        }));
        const skills = await this.skillRepo.find({
            where: { status: 'published' },
            order: { sortOrder: 'ASC' },
        });
        content.skills = skills.map((s) => s.name);
        const expMeta = await this.siteSettingRepo.findOne({
            where: { key: 'experience_meta' },
        });
        const expItems = await this.experienceRepo.find({
            where: { status: 'published' },
            order: { sortOrder: 'ASC' },
        });
        content.experience = {
            cvHref: expMeta?.value?.cvHref ?? '#',
            items: expItems.map((item) => ({
                id: item.slug ?? item.id,
                duration: item.duration,
                position: item.position,
                company: item.company,
                description: item.description,
                logoImage: item.logoImage ?? '',
                hoverImage: item.hoverImage ?? '',
                hoverImageAlt: item.hoverImageAlt ?? '',
            })),
        };
        const heroSocials = await this.socialRepo.find({
            where: { location: 'hero', status: 'published' },
            order: { sortOrder: 'ASC' },
        });
        content.socialLinks = heroSocials.map((s) => ({
            label: s.label,
            href: s.href,
            platform: (s.platform || 'custom'),
            iconUrl: s.iconUrl ?? '',
        }));
        const footer = await this.footerRepo.findOne({
            order: { updatedAt: 'DESC' },
            where: {},
        });
        const footerNav = await this.footerNavRepo.find({
            where: { status: 'published' },
            order: { sortOrder: 'ASC' },
        });
        const footerSocials = await this.socialRepo.find({
            where: { location: 'footer', status: 'published' },
            order: { sortOrder: 'ASC' },
        });
        const contact = await this.contactRepo.findOne({
            order: { updatedAt: 'DESC' },
            where: {},
        });
        if (footer) {
            content.footer = {
                title: footer.title ?? '',
                description: footer.description ?? '',
                image: {
                    src: footer.imageUrl ?? '',
                    alt: footer.imageAlt ?? '',
                },
                contact: {
                    phone: contact?.phone ?? '',
                    email: contact?.email ?? '',
                    phoneHref: contact?.phoneHref ?? '',
                    emailHref: contact?.emailHref ?? '',
                },
                navLinks: footerNav.map((l) => ({ label: l.label, href: l.href })),
                socialLinks: footerSocials.map((s) => ({
                    label: s.label,
                    href: s.href,
                    icon: (s.platform || 'custom'),
                    iconUrl: s.iconUrl ?? '',
                })),
                copyright: footer.copyright ?? '',
            };
        }
        const testimonials = await this.testimonialRepo.find({
            where: { status: 'published' },
            order: { sortOrder: 'ASC' },
        });
        content.testimonials = testimonials.map((t) => ({
            id: t.id,
            name: t.name,
            role: t.role,
            quote: t.quote,
            avatar: t.avatar ?? '',
            rating: t.rating,
        }));
        const certifications = await this.certificationRepo.find({
            where: { status: 'published' },
            order: { sortOrder: 'ASC' },
        });
        content.certifications = certifications.map((c) => ({
            id: c.id,
            title: c.title,
            subtitle: c.subtitle ?? undefined,
            description: c.description,
            date: c.date,
            image: c.image ?? '',
            imageAlt: c.imageAlt ?? '',
            credentialUrl: c.credentialUrl ?? undefined,
        }));
        const pricing = await this.pricingRepo.find({
            where: { status: 'published' },
            order: { sortOrder: 'ASC' },
        });
        content.pricingPlans = pricing.map((p) => ({
            id: p.id,
            name: p.name,
            tagline: p.tagline,
            price: p.price,
            featured: p.featured,
            features: p.features ?? [],
        }));
        return content;
    }
};
exports.CmsNormalizedService = CmsNormalizedService;
exports.CmsNormalizedService = CmsNormalizedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(site_setting_entity_1.SiteSetting)),
    __param(1, (0, typeorm_1.InjectRepository)(hero_setting_entity_1.HeroSetting)),
    __param(2, (0, typeorm_1.InjectRepository)(navbar_item_entity_1.NavbarItem)),
    __param(3, (0, typeorm_1.InjectRepository)(navbar_setting_entity_1.NavbarSetting)),
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
    __param(14, (0, typeorm_1.InjectRepository)(certification_item_entity_1.CertificationItem)),
    __param(15, (0, typeorm_1.InjectRepository)(pricing_plan_entity_1.PricingPlan)),
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
        typeorm_2.Repository,
        typeorm_2.Repository])
], CmsNormalizedService);
//# sourceMappingURL=cms-normalized.service.js.map