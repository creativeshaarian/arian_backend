import { Repository } from 'typeorm';
import { NavbarSetting } from '../entities/navbar-setting.entity';
import { NavbarItem } from '../entities/navbar-item.entity';
import { HeroSetting } from '../entities/hero-setting.entity';
import { AboutSetting } from '../entities/about-setting.entity';
import { ServiceItem } from '../entities/service-item.entity';
import { StackItem } from '../entities/stack-item.entity';
import { SkillItem } from '../entities/skill-item.entity';
import { ExperienceItem } from '../entities/experience-item.entity';
import { SocialLink } from '../entities/social-link.entity';
import { ContactSetting } from '../entities/contact-setting.entity';
import { FooterSetting } from '../entities/footer-setting.entity';
import { FooterNavLink } from '../entities/footer-nav-link.entity';
import { Testimonial } from '../entities/testimonial.entity';
import { CertificationItem } from '../entities/certification-item.entity';
import { PricingPlan } from '../entities/pricing-plan.entity';
import { SiteSetting } from '../entities/site-setting.entity';
import { MediaRelationService } from '../../media/media-relation.service';
import { UpdateNavbarSettingsDto, CreateNavbarItemDto, UpdateNavbarItemDto, UpdateHeroDto, UpdateAboutDto, CreateServiceItemDto, UpdateServiceItemDto, CreateStackItemDto, UpdateStackItemDto, CreateSkillItemDto, UpdateSkillItemDto, CreateExperienceItemDto, UpdateExperienceItemDto, UpdateExperienceMetaDto, CreateSocialLinkDto, UpdateSocialLinkDto, UpdateContactDto, UpdateFooterDto, CreateFooterNavLinkDto, UpdateFooterNavLinkDto, CreateTestimonialDto, UpdateTestimonialDto, CreateCertificationDto, UpdateCertificationDto, CreatePricingPlanDto, UpdatePricingPlanDto } from './dto/cms-admin.dto';
export declare class CmsAdminService {
    private readonly navbarSettingRepo;
    private readonly navbarItemRepo;
    private readonly heroRepo;
    private readonly aboutRepo;
    private readonly serviceRepo;
    private readonly stackRepo;
    private readonly skillRepo;
    private readonly experienceRepo;
    private readonly socialRepo;
    private readonly contactRepo;
    private readonly footerRepo;
    private readonly footerNavRepo;
    private readonly testimonialRepo;
    private readonly certificationRepo;
    private readonly pricingRepo;
    private readonly siteSettingRepo;
    private readonly mediaRelationService;
    constructor(navbarSettingRepo: Repository<NavbarSetting>, navbarItemRepo: Repository<NavbarItem>, heroRepo: Repository<HeroSetting>, aboutRepo: Repository<AboutSetting>, serviceRepo: Repository<ServiceItem>, stackRepo: Repository<StackItem>, skillRepo: Repository<SkillItem>, experienceRepo: Repository<ExperienceItem>, socialRepo: Repository<SocialLink>, contactRepo: Repository<ContactSetting>, footerRepo: Repository<FooterSetting>, footerNavRepo: Repository<FooterNavLink>, testimonialRepo: Repository<Testimonial>, certificationRepo: Repository<CertificationItem>, pricingRepo: Repository<PricingPlan>, siteSettingRepo: Repository<SiteSetting>, mediaRelationService: MediaRelationService);
    private nextSortOrder;
    getNavbar(): Promise<{
        settings: NavbarSetting | null;
        items: NavbarItem[];
    }>;
    updateNavbarSettings(dto: UpdateNavbarSettingsDto): Promise<NavbarSetting>;
    createNavbarItem(dto: CreateNavbarItemDto): Promise<NavbarItem>;
    updateNavbarItem(id: string, dto: UpdateNavbarItemDto): Promise<NavbarItem>;
    deleteNavbarItem(id: string): Promise<{
        success: boolean;
    }>;
    getHero(): Promise<HeroSetting | null>;
    updateHero(dto: UpdateHeroDto): Promise<HeroSetting>;
    getAbout(): Promise<AboutSetting | null>;
    updateAbout(dto: UpdateAboutDto): Promise<AboutSetting>;
    getServices(includeDrafts?: boolean): Promise<ServiceItem[]>;
    createService(dto: CreateServiceItemDto): Promise<ServiceItem>;
    updateService(id: string, dto: UpdateServiceItemDto): Promise<ServiceItem>;
    deleteService(id: string): Promise<{
        success: boolean;
    }>;
    getStack(includeDrafts?: boolean): Promise<StackItem[]>;
    createStackItem(dto: CreateStackItemDto): Promise<StackItem>;
    updateStackItem(id: string, dto: UpdateStackItemDto): Promise<StackItem>;
    deleteStackItem(id: string): Promise<{
        success: boolean;
    }>;
    getSkills(includeDrafts?: boolean): Promise<SkillItem[]>;
    createSkill(dto: CreateSkillItemDto): Promise<SkillItem>;
    updateSkill(id: string, dto: UpdateSkillItemDto): Promise<SkillItem>;
    deleteSkill(id: string): Promise<{
        success: boolean;
    }>;
    getExperience(): Promise<{
        cvHref: string;
        items: ExperienceItem[];
    }>;
    updateExperienceMeta(dto: UpdateExperienceMetaDto): Promise<UpdateExperienceMetaDto>;
    createExperienceItem(dto: CreateExperienceItemDto): Promise<ExperienceItem>;
    updateExperienceItem(id: string, dto: UpdateExperienceItemDto): Promise<ExperienceItem>;
    deleteExperienceItem(id: string): Promise<{
        success: boolean;
    }>;
    getSocialLinks(location?: 'hero' | 'footer'): Promise<SocialLink[]>;
    createSocialLink(dto: CreateSocialLinkDto): Promise<SocialLink>;
    updateSocialLink(id: string, dto: UpdateSocialLinkDto): Promise<SocialLink>;
    deleteSocialLink(id: string): Promise<{
        success: boolean;
    }>;
    getContact(): Promise<ContactSetting | null>;
    updateContact(dto: UpdateContactDto): Promise<ContactSetting>;
    getFooter(): Promise<{
        settings: FooterSetting | null;
        navLinks: FooterNavLink[];
        socialLinks: SocialLink[];
    }>;
    updateFooter(dto: UpdateFooterDto): Promise<FooterSetting>;
    createFooterNavLink(dto: CreateFooterNavLinkDto): Promise<FooterNavLink>;
    updateFooterNavLink(id: string, dto: UpdateFooterNavLinkDto): Promise<FooterNavLink>;
    deleteFooterNavLink(id: string): Promise<{
        success: boolean;
    }>;
    getTestimonials(includeDrafts?: boolean): Promise<Testimonial[]>;
    createTestimonial(dto: CreateTestimonialDto): Promise<Testimonial>;
    updateTestimonial(id: string, dto: UpdateTestimonialDto): Promise<Testimonial>;
    deleteTestimonial(id: string): Promise<{
        success: boolean;
    }>;
    getCertifications(includeDrafts?: boolean): Promise<CertificationItem[]>;
    createCertification(dto: CreateCertificationDto): Promise<CertificationItem>;
    updateCertification(id: string, dto: UpdateCertificationDto): Promise<CertificationItem>;
    deleteCertification(id: string): Promise<{
        success: boolean;
    }>;
    getPricing(includeDrafts?: boolean): Promise<PricingPlan[]>;
    createPricingPlan(dto: CreatePricingPlanDto): Promise<PricingPlan>;
    updatePricingPlan(id: string, dto: UpdatePricingPlanDto): Promise<PricingPlan>;
    deletePricingPlan(id: string): Promise<{
        success: boolean;
    }>;
}
