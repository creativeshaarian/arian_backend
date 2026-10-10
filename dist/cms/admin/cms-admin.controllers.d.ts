import { CmsAdminService } from './cms-admin.service';
import { UpdateNavbarSettingsDto, CreateNavbarItemDto, UpdateNavbarItemDto, UpdateHeroDto, UpdateAboutDto, CreateServiceItemDto, UpdateServiceItemDto, CreateStackItemDto, UpdateStackItemDto, CreateSkillItemDto, UpdateSkillItemDto, CreateExperienceItemDto, UpdateExperienceItemDto, UpdateExperienceMetaDto, CreateSocialLinkDto, UpdateSocialLinkDto, UpdateContactDto, UpdateFooterDto, CreateFooterNavLinkDto, UpdateFooterNavLinkDto, CreateTestimonialDto, UpdateTestimonialDto, CreateCertificationDto, UpdateCertificationDto, CreatePricingPlanDto, UpdatePricingPlanDto } from './dto/cms-admin.dto';
export declare class NavbarAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(): Promise<{
        settings: import("../entities/navbar-setting.entity").NavbarSetting | null;
        items: import("../entities/navbar-item.entity").NavbarItem[];
    }>;
    updateSettings(dto: UpdateNavbarSettingsDto): Promise<import("../entities/navbar-setting.entity").NavbarSetting>;
    createItem(dto: CreateNavbarItemDto): Promise<import("../entities/navbar-item.entity").NavbarItem>;
    updateItem(id: string, dto: UpdateNavbarItemDto): Promise<import("../entities/navbar-item.entity").NavbarItem>;
    deleteItem(id: string): Promise<{
        success: boolean;
    }>;
}
export declare class HeroAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(): Promise<import("../entities/hero-setting.entity").HeroSetting | null>;
    update(dto: UpdateHeroDto): Promise<import("../entities/hero-setting.entity").HeroSetting>;
}
export declare class AboutAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(): Promise<import("../entities/about-setting.entity").AboutSetting | null>;
    update(dto: UpdateAboutDto): Promise<import("../entities/about-setting.entity").AboutSetting>;
}
export declare class ServicesAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(): Promise<import("../entities/service-item.entity").ServiceItem[]>;
    create(dto: CreateServiceItemDto): Promise<import("../entities/service-item.entity").ServiceItem>;
    update(id: string, dto: UpdateServiceItemDto): Promise<import("../entities/service-item.entity").ServiceItem>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
export declare class StackAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(): Promise<import("../entities/stack-item.entity").StackItem[]>;
    create(dto: CreateStackItemDto): Promise<import("../entities/stack-item.entity").StackItem>;
    update(id: string, dto: UpdateStackItemDto): Promise<import("../entities/stack-item.entity").StackItem>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
export declare class SkillsAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(): Promise<import("../entities/skill-item.entity").SkillItem[]>;
    create(dto: CreateSkillItemDto): Promise<import("../entities/skill-item.entity").SkillItem>;
    update(id: string, dto: UpdateSkillItemDto): Promise<import("../entities/skill-item.entity").SkillItem>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
export declare class ExperienceAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(): Promise<{
        cvHref: string;
        items: import("../entities/experience-item.entity").ExperienceItem[];
    }>;
    updateMeta(dto: UpdateExperienceMetaDto): Promise<UpdateExperienceMetaDto>;
    createItem(dto: CreateExperienceItemDto): Promise<import("../entities/experience-item.entity").ExperienceItem>;
    updateItem(id: string, dto: UpdateExperienceItemDto): Promise<import("../entities/experience-item.entity").ExperienceItem>;
    deleteItem(id: string): Promise<{
        success: boolean;
    }>;
}
export declare class SocialLinksAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(location?: 'hero' | 'footer'): Promise<import("../entities/social-link.entity").SocialLink[]>;
    create(dto: CreateSocialLinkDto): Promise<import("../entities/social-link.entity").SocialLink>;
    update(id: string, dto: UpdateSocialLinkDto): Promise<import("../entities/social-link.entity").SocialLink>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
export declare class ContactAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(): Promise<import("../entities/contact-setting.entity").ContactSetting | null>;
    update(dto: UpdateContactDto): Promise<import("../entities/contact-setting.entity").ContactSetting>;
}
export declare class FooterAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(): Promise<{
        settings: import("../entities/footer-setting.entity").FooterSetting | null;
        navLinks: import("../entities/footer-nav-link.entity").FooterNavLink[];
        socialLinks: import("../entities/social-link.entity").SocialLink[];
    }>;
    updateSettings(dto: UpdateFooterDto): Promise<import("../entities/footer-setting.entity").FooterSetting>;
    createNavLink(dto: CreateFooterNavLinkDto): Promise<import("../entities/footer-nav-link.entity").FooterNavLink>;
    updateNavLink(id: string, dto: UpdateFooterNavLinkDto): Promise<import("../entities/footer-nav-link.entity").FooterNavLink>;
    deleteNavLink(id: string): Promise<{
        success: boolean;
    }>;
}
export declare class TestimonialsAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(): Promise<import("../entities/testimonial.entity").Testimonial[]>;
    create(dto: CreateTestimonialDto): Promise<import("../entities/testimonial.entity").Testimonial>;
    update(id: string, dto: UpdateTestimonialDto): Promise<import("../entities/testimonial.entity").Testimonial>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
export declare class CertificationsAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(): Promise<import("../entities/certification-item.entity").CertificationItem[]>;
    create(dto: CreateCertificationDto): Promise<import("../entities/certification-item.entity").CertificationItem>;
    update(id: string, dto: UpdateCertificationDto): Promise<import("../entities/certification-item.entity").CertificationItem>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
export declare class PricingAdminController {
    private readonly cms;
    constructor(cms: CmsAdminService);
    findAll(): Promise<import("../entities/pricing-plan.entity").PricingPlan[]>;
    create(dto: CreatePricingPlanDto): Promise<import("../entities/pricing-plan.entity").PricingPlan>;
    update(id: string, dto: UpdatePricingPlanDto): Promise<import("../entities/pricing-plan.entity").PricingPlan>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
