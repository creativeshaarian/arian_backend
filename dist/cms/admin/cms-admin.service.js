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
exports.CmsAdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const navbar_setting_entity_1 = require("../entities/navbar-setting.entity");
const navbar_item_entity_1 = require("../entities/navbar-item.entity");
const hero_setting_entity_1 = require("../entities/hero-setting.entity");
const about_setting_entity_1 = require("../entities/about-setting.entity");
const service_item_entity_1 = require("../entities/service-item.entity");
const stack_item_entity_1 = require("../entities/stack-item.entity");
const skill_item_entity_1 = require("../entities/skill-item.entity");
const experience_item_entity_1 = require("../entities/experience-item.entity");
const social_link_entity_1 = require("../entities/social-link.entity");
const contact_setting_entity_1 = require("../entities/contact-setting.entity");
const footer_setting_entity_1 = require("../entities/footer-setting.entity");
const footer_nav_link_entity_1 = require("../entities/footer-nav-link.entity");
const testimonial_entity_1 = require("../entities/testimonial.entity");
const certification_item_entity_1 = require("../entities/certification-item.entity");
const pricing_plan_entity_1 = require("../entities/pricing-plan.entity");
const site_setting_entity_1 = require("../entities/site-setting.entity");
const media_relation_service_1 = require("../../media/media-relation.service");
let CmsAdminService = class CmsAdminService {
    constructor(navbarSettingRepo, navbarItemRepo, heroRepo, aboutRepo, serviceRepo, stackRepo, skillRepo, experienceRepo, socialRepo, contactRepo, footerRepo, footerNavRepo, testimonialRepo, certificationRepo, pricingRepo, siteSettingRepo, mediaRelationService) {
        this.navbarSettingRepo = navbarSettingRepo;
        this.navbarItemRepo = navbarItemRepo;
        this.heroRepo = heroRepo;
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
        this.siteSettingRepo = siteSettingRepo;
        this.mediaRelationService = mediaRelationService;
    }
    async nextSortOrder(repo) {
        const result = await repo
            .createQueryBuilder('e')
            .select('MAX(e.sortOrder)', 'max')
            .getRawOne();
        return (result?.max ?? 0) + 1;
    }
    async getNavbar() {
        const [settings, items] = await Promise.all([
            this.navbarSettingRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} }),
            this.navbarItemRepo.find({ order: { sortOrder: 'ASC' } }),
        ]);
        return { settings: settings ?? null, items };
    }
    async updateNavbarSettings(dto) {
        let settings = await this.navbarSettingRepo.findOne({
            order: { updatedAt: 'DESC' },
            where: {},
        });
        if (!settings)
            settings = this.navbarSettingRepo.create();
        if (dto.logoMediaId) {
            const resolved = await this.mediaRelationService.linkMedia({
                mediaId: dto.logoMediaId,
                entityType: 'navbar',
                entityId: settings.id ?? 'navbar',
                field: 'logo',
            });
            settings.logoImage = resolved.url;
        }
        else if (dto.logoImage !== undefined) {
            settings.logoImage = dto.logoImage;
        }
        if (dto.logoText !== undefined)
            settings.logoText = dto.logoText;
        if (dto.ctaText !== undefined)
            settings.ctaText = dto.ctaText;
        if (dto.ctaHref !== undefined)
            settings.ctaHref = dto.ctaHref;
        return this.navbarSettingRepo.save(settings);
    }
    async createNavbarItem(dto) {
        const item = this.navbarItemRepo.create({
            ...dto,
            placement: dto.placement ?? 'main',
            sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.navbarItemRepo)),
            status: dto.status ?? 'published',
        });
        return this.navbarItemRepo.save(item);
    }
    async updateNavbarItem(id, dto) {
        const item = await this.navbarItemRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Navbar item "${id}" not found`);
        if (dto.label !== undefined)
            item.label = dto.label;
        if (dto.href !== undefined)
            item.href = dto.href;
        if (dto.placement !== undefined)
            item.placement = dto.placement;
        if (dto.sortOrder !== undefined)
            item.sortOrder = dto.sortOrder;
        if (dto.status !== undefined)
            item.status = dto.status;
        return this.navbarItemRepo.save(item);
    }
    async deleteNavbarItem(id) {
        const item = await this.navbarItemRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Navbar item "${id}" not found`);
        await this.navbarItemRepo.remove(item);
        return { success: true };
    }
    async getHero() {
        return ((await this.heroRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} })) ??
            null);
    }
    async updateHero(dto) {
        let hero = await this.heroRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} });
        if (!hero)
            hero = this.heroRepo.create();
        if (dto.profileMediaId) {
            const resolved = await this.mediaRelationService.linkMedia({
                mediaId: dto.profileMediaId,
                entityType: 'hero',
                entityId: hero.id ?? 'hero',
                field: 'profile',
            });
            hero.profileImage = resolved.url;
        }
        else if (dto.profileImage !== undefined) {
            hero.profileImage = dto.profileImage;
        }
        Object.assign(hero, {
            greeting: dto.greeting ?? hero.greeting,
            name: dto.name ?? hero.name,
            marqueeName: dto.marqueeName ?? hero.marqueeName,
            profileAlt: dto.profileAlt ?? hero.profileAlt,
            ctaText: dto.ctaText ?? hero.ctaText,
            ctaHref: dto.ctaHref ?? hero.ctaHref,
            ctaIcon: dto.ctaIcon ?? hero.ctaIcon,
            secondaryCtaText: dto.secondaryCtaText ?? hero.secondaryCtaText,
            secondaryCtaHref: dto.secondaryCtaHref ?? hero.secondaryCtaHref,
            backgroundImages: dto.backgroundImages ?? hero.backgroundImages,
            floatingImages: dto.floatingImages ?? hero.floatingImages,
            badges: dto.badges ?? hero.badges,
            statistics: dto.statistics ?? hero.statistics,
        });
        const saved = await this.heroRepo.save(hero);
        if (dto.profileMediaId) {
            await this.mediaRelationService.linkMedia({
                mediaId: dto.profileMediaId,
                entityType: 'hero',
                entityId: saved.id,
                field: 'profile',
            });
        }
        return saved;
    }
    async getAbout() {
        return ((await this.aboutRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} })) ??
            null);
    }
    async updateAbout(dto) {
        let about = await this.aboutRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} });
        if (!about)
            about = this.aboutRepo.create();
        if (dto.profileMediaId) {
            const resolved = await this.mediaRelationService.linkMedia({
                mediaId: dto.profileMediaId,
                entityType: 'about',
                entityId: about.id ?? 'about',
                field: 'profile',
            });
            about.profileImage = resolved.url;
        }
        else if (dto.profileImage !== undefined) {
            about.profileImage = dto.profileImage;
        }
        Object.assign(about, {
            heading: dto.heading ?? about.heading,
            text: dto.text ?? about.text,
            experienceYears: dto.experienceYears ?? about.experienceYears,
            features: dto.features ?? about.features,
        });
        const saved = await this.aboutRepo.save(about);
        if (dto.profileMediaId) {
            await this.mediaRelationService.linkMedia({
                mediaId: dto.profileMediaId,
                entityType: 'about',
                entityId: saved.id,
                field: 'profile',
            });
        }
        return saved;
    }
    async getServices(includeDrafts = true) {
        const where = includeDrafts ? {} : { status: 'published' };
        return this.serviceRepo.find({ where, order: { sortOrder: 'ASC' } });
    }
    async createService(dto) {
        const item = this.serviceRepo.create({
            number: dto.number,
            title: dto.title,
            description: dto.description,
            shapeAlt: dto.shapeAlt,
            rotate: dto.rotate,
            sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.serviceRepo)),
            status: dto.status ?? 'published',
            shapeImage: dto.shapeImage,
        });
        if (dto.shapeMediaId) {
            const resolved = await this.mediaRelationService.resolveMediaUrl(dto.shapeMediaId);
            item.shapeImage = resolved ?? '';
        }
        const saved = await this.serviceRepo.save(item);
        if (dto.shapeMediaId) {
            await this.mediaRelationService.linkMedia({
                mediaId: dto.shapeMediaId,
                entityType: 'service',
                entityId: saved.id,
                field: 'shape',
            });
        }
        return saved;
    }
    async updateService(id, dto) {
        const item = await this.serviceRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Service "${id}" not found`);
        if (dto.shapeMediaId) {
            const resolved = await this.mediaRelationService.linkMedia({
                mediaId: dto.shapeMediaId,
                entityType: 'service',
                entityId: id,
                field: 'shape',
            });
            item.shapeImage = resolved.url;
        }
        else if (dto.shapeImage !== undefined) {
            item.shapeImage = dto.shapeImage;
        }
        Object.assign(item, {
            number: dto.number ?? item.number,
            title: dto.title ?? item.title,
            description: dto.description ?? item.description,
            shapeAlt: dto.shapeAlt ?? item.shapeAlt,
            rotate: dto.rotate ?? item.rotate,
            sortOrder: dto.sortOrder ?? item.sortOrder,
            status: dto.status ?? item.status,
        });
        return this.serviceRepo.save(item);
    }
    async deleteService(id) {
        const item = await this.serviceRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Service "${id}" not found`);
        await this.serviceRepo.remove(item);
        return { success: true };
    }
    async getStack(includeDrafts = true) {
        const where = includeDrafts ? {} : { status: 'published' };
        return this.stackRepo.find({ where, order: { sortOrder: 'ASC' } });
    }
    async createStackItem(dto) {
        const item = this.stackRepo.create({
            name: dto.name,
            description: dto.description,
            category: dto.category,
            progress: dto.progress,
            sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.stackRepo)),
            status: dto.status ?? 'published',
            icon: dto.icon,
        });
        if (dto.iconMediaId) {
            item.icon = (await this.mediaRelationService.resolveMediaUrl(dto.iconMediaId)) ?? '';
        }
        const saved = await this.stackRepo.save(item);
        if (dto.iconMediaId) {
            await this.mediaRelationService.linkMedia({
                mediaId: dto.iconMediaId,
                entityType: 'stack',
                entityId: saved.id,
                field: 'icon',
            });
        }
        return saved;
    }
    async updateStackItem(id, dto) {
        const item = await this.stackRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Stack item "${id}" not found`);
        if (dto.iconMediaId) {
            const resolved = await this.mediaRelationService.linkMedia({
                mediaId: dto.iconMediaId,
                entityType: 'stack',
                entityId: id,
                field: 'icon',
            });
            item.icon = resolved.url;
        }
        else if (dto.icon !== undefined) {
            item.icon = dto.icon;
        }
        Object.assign(item, {
            name: dto.name ?? item.name,
            description: dto.description ?? item.description,
            category: dto.category ?? item.category,
            progress: dto.progress ?? item.progress,
            sortOrder: dto.sortOrder ?? item.sortOrder,
            status: dto.status ?? item.status,
        });
        return this.stackRepo.save(item);
    }
    async deleteStackItem(id) {
        const item = await this.stackRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Stack item "${id}" not found`);
        await this.stackRepo.remove(item);
        return { success: true };
    }
    async getSkills(includeDrafts = true) {
        const where = includeDrafts ? {} : { status: 'published' };
        return this.skillRepo.find({ where, order: { sortOrder: 'ASC' } });
    }
    async createSkill(dto) {
        const item = this.skillRepo.create({
            name: dto.name,
            sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.skillRepo)),
            status: dto.status ?? 'published',
        });
        return this.skillRepo.save(item);
    }
    async updateSkill(id, dto) {
        const item = await this.skillRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Skill "${id}" not found`);
        Object.assign(item, dto);
        return this.skillRepo.save(item);
    }
    async deleteSkill(id) {
        const item = await this.skillRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Skill "${id}" not found`);
        await this.skillRepo.remove(item);
        return { success: true };
    }
    async getExperience() {
        const [meta, items] = await Promise.all([
            this.siteSettingRepo.findOne({ where: { key: 'experience_meta' } }),
            this.experienceRepo.find({ order: { sortOrder: 'ASC' } }),
        ]);
        return {
            cvHref: meta?.value?.cvHref ?? '#',
            items,
        };
    }
    async updateExperienceMeta(dto) {
        const existing = await this.siteSettingRepo.findOne({
            where: { key: 'experience_meta' },
        });
        const value = { cvHref: dto.cvHref };
        if (existing) {
            existing.value = value;
            await this.siteSettingRepo.save(existing);
        }
        else {
            await this.siteSettingRepo.save(this.siteSettingRepo.create({ key: 'experience_meta', value }));
        }
        return dto;
    }
    async createExperienceItem(dto) {
        const item = this.experienceRepo.create({
            slug: dto.slug,
            duration: dto.duration,
            position: dto.position,
            company: dto.company,
            description: dto.description,
            hoverImageAlt: dto.hoverImageAlt,
            sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.experienceRepo)),
            status: dto.status ?? 'published',
            logoImage: dto.logoImage,
            hoverImage: dto.hoverImage,
        });
        if (dto.logoMediaId) {
            item.logoImage =
                (await this.mediaRelationService.resolveMediaUrl(dto.logoMediaId)) ?? '';
        }
        if (dto.hoverMediaId) {
            item.hoverImage =
                (await this.mediaRelationService.resolveMediaUrl(dto.hoverMediaId)) ?? '';
        }
        const saved = await this.experienceRepo.save(item);
        if (dto.logoMediaId) {
            await this.mediaRelationService.linkMedia({
                mediaId: dto.logoMediaId,
                entityType: 'experience',
                entityId: saved.id,
                field: 'logo',
            });
        }
        if (dto.hoverMediaId) {
            await this.mediaRelationService.linkMedia({
                mediaId: dto.hoverMediaId,
                entityType: 'experience',
                entityId: saved.id,
                field: 'hover',
            });
        }
        return saved;
    }
    async updateExperienceItem(id, dto) {
        const item = await this.experienceRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Experience "${id}" not found`);
        if (dto.logoMediaId) {
            const resolved = await this.mediaRelationService.linkMedia({
                mediaId: dto.logoMediaId,
                entityType: 'experience',
                entityId: id,
                field: 'logo',
            });
            item.logoImage = resolved.url;
        }
        else if (dto.logoImage !== undefined) {
            item.logoImage = dto.logoImage;
        }
        if (dto.hoverMediaId) {
            const resolved = await this.mediaRelationService.linkMedia({
                mediaId: dto.hoverMediaId,
                entityType: 'experience',
                entityId: id,
                field: 'hover',
            });
            item.hoverImage = resolved.url;
        }
        else if (dto.hoverImage !== undefined) {
            item.hoverImage = dto.hoverImage;
        }
        Object.assign(item, {
            slug: dto.slug ?? item.slug,
            duration: dto.duration ?? item.duration,
            position: dto.position ?? item.position,
            company: dto.company ?? item.company,
            description: dto.description ?? item.description,
            hoverImageAlt: dto.hoverImageAlt ?? item.hoverImageAlt,
            sortOrder: dto.sortOrder ?? item.sortOrder,
            status: dto.status ?? item.status,
        });
        return this.experienceRepo.save(item);
    }
    async deleteExperienceItem(id) {
        const item = await this.experienceRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Experience "${id}" not found`);
        await this.experienceRepo.remove(item);
        return { success: true };
    }
    async getSocialLinks(location) {
        const where = location ? { location } : {};
        return this.socialRepo.find({ where, order: { sortOrder: 'ASC' } });
    }
    async createSocialLink(dto) {
        const platform = dto.platform?.trim() ||
            dto.label
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '') ||
            'custom';
        let iconUrl = dto.iconUrl;
        if (dto.iconMediaId) {
            iconUrl =
                (await this.mediaRelationService.resolveMediaUrl(dto.iconMediaId)) ??
                    iconUrl;
        }
        const item = this.socialRepo.create({
            label: dto.label,
            href: dto.href,
            platform,
            iconUrl,
            iconMediaId: dto.iconMediaId,
            location: dto.location ?? 'hero',
            sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.socialRepo)),
            status: dto.status ?? 'published',
        });
        const saved = await this.socialRepo.save(item);
        if (dto.iconMediaId) {
            await this.mediaRelationService.linkMedia({
                mediaId: dto.iconMediaId,
                entityType: 'social',
                entityId: saved.id,
                field: 'icon',
            });
        }
        return saved;
    }
    async updateSocialLink(id, dto) {
        const item = await this.socialRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Social link "${id}" not found`);
        if (dto.iconMediaId) {
            const resolved = await this.mediaRelationService.linkMedia({
                mediaId: dto.iconMediaId,
                entityType: 'social',
                entityId: id,
                field: 'icon',
            });
            item.iconUrl = resolved.url;
            item.iconMediaId = dto.iconMediaId;
        }
        else if (dto.iconUrl !== undefined) {
            item.iconUrl = dto.iconUrl;
        }
        if (dto.label !== undefined)
            item.label = dto.label;
        if (dto.href !== undefined)
            item.href = dto.href;
        if (dto.platform !== undefined)
            item.platform = dto.platform;
        if (dto.location !== undefined)
            item.location = dto.location;
        if (dto.sortOrder !== undefined)
            item.sortOrder = dto.sortOrder;
        if (dto.status !== undefined)
            item.status = dto.status;
        return this.socialRepo.save(item);
    }
    async deleteSocialLink(id) {
        const item = await this.socialRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Social link "${id}" not found`);
        await this.socialRepo.remove(item);
        return { success: true };
    }
    async getContact() {
        return ((await this.contactRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} })) ??
            null);
    }
    async updateContact(dto) {
        let contact = await this.contactRepo.findOne({
            order: { updatedAt: 'DESC' },
            where: {},
        });
        if (!contact)
            contact = this.contactRepo.create();
        Object.assign(contact, dto);
        return this.contactRepo.save(contact);
    }
    async getFooter() {
        const [settings, navLinks] = await Promise.all([
            this.footerRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} }),
            this.footerNavRepo.find({ order: { sortOrder: 'ASC' } }),
        ]);
        const socialLinks = await this.socialRepo.find({
            where: { location: 'footer' },
            order: { sortOrder: 'ASC' },
        });
        return { settings: settings ?? null, navLinks, socialLinks };
    }
    async updateFooter(dto) {
        let footer = await this.footerRepo.findOne({
            order: { updatedAt: 'DESC' },
            where: {},
        });
        if (!footer)
            footer = this.footerRepo.create();
        if (dto.imageMediaId) {
            const resolved = await this.mediaRelationService.linkMedia({
                mediaId: dto.imageMediaId,
                entityType: 'footer',
                entityId: footer.id ?? 'footer',
                field: 'logo',
            });
            footer.imageUrl = resolved.url;
        }
        else if (dto.imageUrl !== undefined) {
            footer.imageUrl = dto.imageUrl;
        }
        Object.assign(footer, {
            title: dto.title ?? footer.title,
            description: dto.description ?? footer.description,
            imageAlt: dto.imageAlt ?? footer.imageAlt,
            copyright: dto.copyright ?? footer.copyright,
        });
        const saved = await this.footerRepo.save(footer);
        if (dto.imageMediaId) {
            await this.mediaRelationService.linkMedia({
                mediaId: dto.imageMediaId,
                entityType: 'footer',
                entityId: saved.id,
                field: 'logo',
            });
        }
        return saved;
    }
    async createFooterNavLink(dto) {
        const item = this.footerNavRepo.create({
            ...dto,
            sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.footerNavRepo)),
            status: dto.status ?? 'published',
        });
        return this.footerNavRepo.save(item);
    }
    async updateFooterNavLink(id, dto) {
        const item = await this.footerNavRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Footer nav link "${id}" not found`);
        Object.assign(item, dto);
        return this.footerNavRepo.save(item);
    }
    async deleteFooterNavLink(id) {
        const item = await this.footerNavRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Footer nav link "${id}" not found`);
        await this.footerNavRepo.remove(item);
        return { success: true };
    }
    async getTestimonials(includeDrafts = true) {
        const where = includeDrafts ? {} : { status: 'published' };
        return this.testimonialRepo.find({ where, order: { sortOrder: 'ASC' } });
    }
    async createTestimonial(dto) {
        const item = this.testimonialRepo.create({
            name: dto.name,
            role: dto.role,
            quote: dto.quote,
            rating: dto.rating,
            sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.testimonialRepo)),
            status: dto.status ?? 'published',
            avatar: dto.avatar,
        });
        if (dto.avatarMediaId) {
            item.avatar =
                (await this.mediaRelationService.resolveMediaUrl(dto.avatarMediaId)) ?? '';
        }
        const saved = await this.testimonialRepo.save(item);
        if (dto.avatarMediaId) {
            await this.mediaRelationService.linkMedia({
                mediaId: dto.avatarMediaId,
                entityType: 'testimonial',
                entityId: saved.id,
                field: 'avatar',
            });
        }
        return saved;
    }
    async updateTestimonial(id, dto) {
        const item = await this.testimonialRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Testimonial "${id}" not found`);
        if (dto.avatarMediaId) {
            const resolved = await this.mediaRelationService.linkMedia({
                mediaId: dto.avatarMediaId,
                entityType: 'testimonial',
                entityId: id,
                field: 'avatar',
            });
            item.avatar = resolved.url;
        }
        else if (dto.avatar !== undefined) {
            item.avatar = dto.avatar;
        }
        Object.assign(item, {
            name: dto.name ?? item.name,
            role: dto.role ?? item.role,
            quote: dto.quote ?? item.quote,
            rating: dto.rating ?? item.rating,
            sortOrder: dto.sortOrder ?? item.sortOrder,
            status: dto.status ?? item.status,
        });
        return this.testimonialRepo.save(item);
    }
    async deleteTestimonial(id) {
        const item = await this.testimonialRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Testimonial "${id}" not found`);
        await this.testimonialRepo.remove(item);
        return { success: true };
    }
    async getCertifications(includeDrafts = true) {
        const where = includeDrafts ? {} : { status: 'published' };
        return this.certificationRepo.find({ where, order: { sortOrder: 'ASC' } });
    }
    async createCertification(dto) {
        const item = this.certificationRepo.create({
            title: dto.title,
            subtitle: dto.subtitle,
            description: dto.description,
            date: dto.date,
            imageAlt: dto.imageAlt,
            image: dto.image,
            sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.certificationRepo)),
            status: dto.status ?? 'published',
            credentialUrl: dto.credentialUrl,
        });
        if (dto.imageMediaId) {
            item.image =
                (await this.mediaRelationService.resolveMediaUrl(dto.imageMediaId)) ??
                    '';
        }
        const saved = await this.certificationRepo.save(item);
        if (dto.imageMediaId) {
            await this.mediaRelationService.linkMedia({
                mediaId: dto.imageMediaId,
                entityType: 'certification',
                entityId: saved.id,
                field: 'image',
            });
        }
        return saved;
    }
    async updateCertification(id, dto) {
        const item = await this.certificationRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Certification "${id}" not found`);
        if (dto.imageMediaId) {
            const resolved = await this.mediaRelationService.linkMedia({
                mediaId: dto.imageMediaId,
                entityType: 'certification',
                entityId: id,
                field: 'image',
            });
            item.image = resolved.url;
        }
        else if (dto.image !== undefined) {
            item.image = dto.image;
        }
        Object.assign(item, {
            title: dto.title ?? item.title,
            subtitle: dto.subtitle ?? item.subtitle,
            description: dto.description ?? item.description,
            date: dto.date ?? item.date,
            imageAlt: dto.imageAlt ?? item.imageAlt,
            credentialUrl: dto.credentialUrl ?? item.credentialUrl,
            sortOrder: dto.sortOrder ?? item.sortOrder,
            status: dto.status ?? item.status,
        });
        return this.certificationRepo.save(item);
    }
    async deleteCertification(id) {
        const item = await this.certificationRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Certification "${id}" not found`);
        await this.certificationRepo.remove(item);
        return { success: true };
    }
    async getPricing(includeDrafts = true) {
        const where = includeDrafts ? {} : { status: 'published' };
        return this.pricingRepo.find({ where, order: { sortOrder: 'ASC' } });
    }
    async createPricingPlan(dto) {
        const item = this.pricingRepo.create({
            ...dto,
            sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.pricingRepo)),
            status: dto.status ?? 'published',
            features: dto.features ?? [],
        });
        return this.pricingRepo.save(item);
    }
    async updatePricingPlan(id, dto) {
        const item = await this.pricingRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Pricing plan "${id}" not found`);
        Object.assign(item, {
            name: dto.name ?? item.name,
            tagline: dto.tagline ?? item.tagline,
            price: dto.price ?? item.price,
            featured: dto.featured ?? item.featured,
            features: dto.features ?? item.features,
            sortOrder: dto.sortOrder ?? item.sortOrder,
            status: dto.status ?? item.status,
        });
        return this.pricingRepo.save(item);
    }
    async deletePricingPlan(id) {
        const item = await this.pricingRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Pricing plan "${id}" not found`);
        await this.pricingRepo.remove(item);
        return { success: true };
    }
};
exports.CmsAdminService = CmsAdminService;
exports.CmsAdminService = CmsAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(navbar_setting_entity_1.NavbarSetting)),
    __param(1, (0, typeorm_1.InjectRepository)(navbar_item_entity_1.NavbarItem)),
    __param(2, (0, typeorm_1.InjectRepository)(hero_setting_entity_1.HeroSetting)),
    __param(3, (0, typeorm_1.InjectRepository)(about_setting_entity_1.AboutSetting)),
    __param(4, (0, typeorm_1.InjectRepository)(service_item_entity_1.ServiceItem)),
    __param(5, (0, typeorm_1.InjectRepository)(stack_item_entity_1.StackItem)),
    __param(6, (0, typeorm_1.InjectRepository)(skill_item_entity_1.SkillItem)),
    __param(7, (0, typeorm_1.InjectRepository)(experience_item_entity_1.ExperienceItem)),
    __param(8, (0, typeorm_1.InjectRepository)(social_link_entity_1.SocialLink)),
    __param(9, (0, typeorm_1.InjectRepository)(contact_setting_entity_1.ContactSetting)),
    __param(10, (0, typeorm_1.InjectRepository)(footer_setting_entity_1.FooterSetting)),
    __param(11, (0, typeorm_1.InjectRepository)(footer_nav_link_entity_1.FooterNavLink)),
    __param(12, (0, typeorm_1.InjectRepository)(testimonial_entity_1.Testimonial)),
    __param(13, (0, typeorm_1.InjectRepository)(certification_item_entity_1.CertificationItem)),
    __param(14, (0, typeorm_1.InjectRepository)(pricing_plan_entity_1.PricingPlan)),
    __param(15, (0, typeorm_1.InjectRepository)(site_setting_entity_1.SiteSetting)),
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
        typeorm_2.Repository,
        media_relation_service_1.MediaRelationService])
], CmsAdminService);
//# sourceMappingURL=cms-admin.service.js.map