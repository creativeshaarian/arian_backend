import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
import {
  UpdateNavbarSettingsDto,
  CreateNavbarItemDto,
  UpdateNavbarItemDto,
  UpdateHeroDto,
  UpdateAboutDto,
  CreateServiceItemDto,
  UpdateServiceItemDto,
  CreateStackItemDto,
  UpdateStackItemDto,
  CreateSkillItemDto,
  UpdateSkillItemDto,
  CreateExperienceItemDto,
  UpdateExperienceItemDto,
  UpdateExperienceMetaDto,
  CreateSocialLinkDto,
  UpdateSocialLinkDto,
  UpdateContactDto,
  UpdateFooterDto,
  CreateFooterNavLinkDto,
  UpdateFooterNavLinkDto,
  CreateTestimonialDto,
  UpdateTestimonialDto,
  CreateCertificationDto,
  UpdateCertificationDto,
  CreatePricingPlanDto,
  UpdatePricingPlanDto,
} from './dto/cms-admin.dto';

@Injectable()
export class CmsAdminService {
  constructor(
    @InjectRepository(NavbarSetting)
    private readonly navbarSettingRepo: Repository<NavbarSetting>,
    @InjectRepository(NavbarItem)
    private readonly navbarItemRepo: Repository<NavbarItem>,
    @InjectRepository(HeroSetting)
    private readonly heroRepo: Repository<HeroSetting>,
    @InjectRepository(AboutSetting)
    private readonly aboutRepo: Repository<AboutSetting>,
    @InjectRepository(ServiceItem)
    private readonly serviceRepo: Repository<ServiceItem>,
    @InjectRepository(StackItem)
    private readonly stackRepo: Repository<StackItem>,
    @InjectRepository(SkillItem)
    private readonly skillRepo: Repository<SkillItem>,
    @InjectRepository(ExperienceItem)
    private readonly experienceRepo: Repository<ExperienceItem>,
    @InjectRepository(SocialLink)
    private readonly socialRepo: Repository<SocialLink>,
    @InjectRepository(ContactSetting)
    private readonly contactRepo: Repository<ContactSetting>,
    @InjectRepository(FooterSetting)
    private readonly footerRepo: Repository<FooterSetting>,
    @InjectRepository(FooterNavLink)
    private readonly footerNavRepo: Repository<FooterNavLink>,
    @InjectRepository(Testimonial)
    private readonly testimonialRepo: Repository<Testimonial>,
    @InjectRepository(CertificationItem)
    private readonly certificationRepo: Repository<CertificationItem>,
    @InjectRepository(PricingPlan)
    private readonly pricingRepo: Repository<PricingPlan>,
    @InjectRepository(SiteSetting)
    private readonly siteSettingRepo: Repository<SiteSetting>,
    private readonly mediaRelationService: MediaRelationService,
  ) {}

  private async nextSortOrder<T extends { sortOrder: number }>(
    repo: Repository<T>,
  ) {
    const result = await repo
      .createQueryBuilder('e')
      .select('MAX(e.sortOrder)', 'max')
      .getRawOne<{ max: number | null }>();
    return (result?.max ?? 0) + 1;
  }

  // Navbar
  async getNavbar() {
    const [settings, items] = await Promise.all([
      this.navbarSettingRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} }),
      this.navbarItemRepo.find({ order: { sortOrder: 'ASC' } }),
    ]);
    return { settings: settings ?? null, items };
  }

  async updateNavbarSettings(dto: UpdateNavbarSettingsDto) {
    let settings = await this.navbarSettingRepo.findOne({
      order: { updatedAt: 'DESC' },
      where: {},
    });
    if (!settings) settings = this.navbarSettingRepo.create();

    if (dto.logoMediaId) {
      const resolved = await this.mediaRelationService.linkMedia({
        mediaId: dto.logoMediaId,
        entityType: 'navbar',
        entityId: settings.id ?? 'navbar',
        field: 'logo',
      });
      settings.logoImage = resolved.url;
    } else if (dto.logoImage !== undefined) {
      settings.logoImage = dto.logoImage;
    }

    if (dto.logoText !== undefined) settings.logoText = dto.logoText;
    if (dto.ctaText !== undefined) settings.ctaText = dto.ctaText;
    if (dto.ctaHref !== undefined) settings.ctaHref = dto.ctaHref;

    return this.navbarSettingRepo.save(settings);
  }

  async createNavbarItem(dto: CreateNavbarItemDto) {
    const item = this.navbarItemRepo.create({
      ...dto,
      placement: dto.placement ?? 'main',
      sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.navbarItemRepo)),
      status: dto.status ?? 'published',
    });
    return this.navbarItemRepo.save(item);
  }

  async updateNavbarItem(id: string, dto: UpdateNavbarItemDto) {
    const item = await this.navbarItemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Navbar item "${id}" not found`);
    if (dto.label !== undefined) item.label = dto.label;
    if (dto.href !== undefined) item.href = dto.href;
    if (dto.placement !== undefined) item.placement = dto.placement;
    if (dto.sortOrder !== undefined) item.sortOrder = dto.sortOrder;
    if (dto.status !== undefined) item.status = dto.status;
    return this.navbarItemRepo.save(item);
  }

  async deleteNavbarItem(id: string) {
    const item = await this.navbarItemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Navbar item "${id}" not found`);
    await this.navbarItemRepo.remove(item);
    return { success: true };
  }

  // Hero
  async getHero() {
    return (
      (await this.heroRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} })) ??
      null
    );
  }

  async updateHero(dto: UpdateHeroDto) {
    let hero = await this.heroRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} });
    if (!hero) hero = this.heroRepo.create();

    if (dto.profileMediaId) {
      const resolved = await this.mediaRelationService.linkMedia({
        mediaId: dto.profileMediaId,
        entityType: 'hero',
        entityId: hero.id ?? 'hero',
        field: 'profile',
      });
      hero.profileImage = resolved.url;
    } else if (dto.profileImage !== undefined) {
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

  // About
  async getAbout() {
    return (
      (await this.aboutRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} })) ??
      null
    );
  }

  async updateAbout(dto: UpdateAboutDto) {
    let about = await this.aboutRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} });
    if (!about) about = this.aboutRepo.create();

    if (dto.profileMediaId) {
      const resolved = await this.mediaRelationService.linkMedia({
        mediaId: dto.profileMediaId,
        entityType: 'about',
        entityId: about.id ?? 'about',
        field: 'profile',
      });
      about.profileImage = resolved.url;
    } else if (dto.profileImage !== undefined) {
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

  // Services
  async getServices(includeDrafts = true) {
    const where = includeDrafts ? {} : { status: 'published' };
    return this.serviceRepo.find({ where, order: { sortOrder: 'ASC' } });
  }

  async createService(dto: CreateServiceItemDto) {
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
      const resolved = await this.mediaRelationService.resolveMediaUrl(
        dto.shapeMediaId,
      );
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

  async updateService(id: string, dto: UpdateServiceItemDto) {
    const item = await this.serviceRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Service "${id}" not found`);

    if (dto.shapeMediaId) {
      const resolved = await this.mediaRelationService.linkMedia({
        mediaId: dto.shapeMediaId,
        entityType: 'service',
        entityId: id,
        field: 'shape',
      });
      item.shapeImage = resolved.url;
    } else if (dto.shapeImage !== undefined) {
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

  async deleteService(id: string) {
    const item = await this.serviceRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Service "${id}" not found`);
    await this.serviceRepo.remove(item);
    return { success: true };
  }

  // Stack
  async getStack(includeDrafts = true) {
    const where = includeDrafts ? {} : { status: 'published' };
    return this.stackRepo.find({ where, order: { sortOrder: 'ASC' } });
  }

  async createStackItem(dto: CreateStackItemDto) {
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

  async updateStackItem(id: string, dto: UpdateStackItemDto) {
    const item = await this.stackRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Stack item "${id}" not found`);
    if (dto.iconMediaId) {
      const resolved = await this.mediaRelationService.linkMedia({
        mediaId: dto.iconMediaId,
        entityType: 'stack',
        entityId: id,
        field: 'icon',
      });
      item.icon = resolved.url;
    } else if (dto.icon !== undefined) {
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

  async deleteStackItem(id: string) {
    const item = await this.stackRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Stack item "${id}" not found`);
    await this.stackRepo.remove(item);
    return { success: true };
  }

  // Skills
  async getSkills(includeDrafts = true) {
    const where = includeDrafts ? {} : { status: 'published' };
    return this.skillRepo.find({ where, order: { sortOrder: 'ASC' } });
  }

  async createSkill(dto: CreateSkillItemDto) {
    const item = this.skillRepo.create({
      name: dto.name,
      sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.skillRepo)),
      status: dto.status ?? 'published',
    });
    return this.skillRepo.save(item);
  }

  async updateSkill(id: string, dto: UpdateSkillItemDto) {
    const item = await this.skillRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Skill "${id}" not found`);
    Object.assign(item, dto);
    return this.skillRepo.save(item);
  }

  async deleteSkill(id: string) {
    const item = await this.skillRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Skill "${id}" not found`);
    await this.skillRepo.remove(item);
    return { success: true };
  }

  // Experience
  async getExperience() {
    const [meta, items] = await Promise.all([
      this.siteSettingRepo.findOne({ where: { key: 'experience_meta' } }),
      this.experienceRepo.find({ order: { sortOrder: 'ASC' } }),
    ]);
    return {
      cvHref: (meta?.value as { cvHref?: string })?.cvHref ?? '#',
      items,
    };
  }

  async updateExperienceMeta(dto: UpdateExperienceMetaDto) {
    const existing = await this.siteSettingRepo.findOne({
      where: { key: 'experience_meta' },
    });
    const value = { cvHref: dto.cvHref };
    if (existing) {
      existing.value = value;
      await this.siteSettingRepo.save(existing);
    } else {
      await this.siteSettingRepo.save(
        this.siteSettingRepo.create({ key: 'experience_meta', value }),
      );
    }
    return dto;
  }

  async createExperienceItem(dto: CreateExperienceItemDto) {
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

  async updateExperienceItem(id: string, dto: UpdateExperienceItemDto) {
    const item = await this.experienceRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Experience "${id}" not found`);

    if (dto.logoMediaId) {
      const resolved = await this.mediaRelationService.linkMedia({
        mediaId: dto.logoMediaId,
        entityType: 'experience',
        entityId: id,
        field: 'logo',
      });
      item.logoImage = resolved.url;
    } else if (dto.logoImage !== undefined) {
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
    } else if (dto.hoverImage !== undefined) {
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

  async deleteExperienceItem(id: string) {
    const item = await this.experienceRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Experience "${id}" not found`);
    await this.experienceRepo.remove(item);
    return { success: true };
  }

  // Social links
  async getSocialLinks(location?: 'hero' | 'footer') {
    const where = location ? { location } : {};
    return this.socialRepo.find({ where, order: { sortOrder: 'ASC' } });
  }

  async createSocialLink(dto: CreateSocialLinkDto) {
    const platform =
      dto.platform?.trim() ||
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

  async updateSocialLink(id: string, dto: UpdateSocialLinkDto) {
    const item = await this.socialRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Social link "${id}" not found`);

    if (dto.iconMediaId) {
      const resolved = await this.mediaRelationService.linkMedia({
        mediaId: dto.iconMediaId,
        entityType: 'social',
        entityId: id,
        field: 'icon',
      });
      item.iconUrl = resolved.url;
      item.iconMediaId = dto.iconMediaId;
    } else if (dto.iconUrl !== undefined) {
      item.iconUrl = dto.iconUrl;
    }

    if (dto.label !== undefined) item.label = dto.label;
    if (dto.href !== undefined) item.href = dto.href;
    if (dto.platform !== undefined) item.platform = dto.platform;
    if (dto.location !== undefined) item.location = dto.location;
    if (dto.sortOrder !== undefined) item.sortOrder = dto.sortOrder;
    if (dto.status !== undefined) item.status = dto.status;

    return this.socialRepo.save(item);
  }

  async deleteSocialLink(id: string) {
    const item = await this.socialRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Social link "${id}" not found`);
    await this.socialRepo.remove(item);
    return { success: true };
  }

  // Contact
  async getContact() {
    return (
      (await this.contactRepo.findOne({ order: { updatedAt: 'DESC' }, where: {} })) ??
      null
    );
  }

  async updateContact(dto: UpdateContactDto) {
    let contact = await this.contactRepo.findOne({
      order: { updatedAt: 'DESC' },
      where: {},
    });
    if (!contact) contact = this.contactRepo.create();
    Object.assign(contact, dto);
    return this.contactRepo.save(contact);
  }

  // Footer
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

  async updateFooter(dto: UpdateFooterDto) {
    let footer = await this.footerRepo.findOne({
      order: { updatedAt: 'DESC' },
      where: {},
    });
    if (!footer) footer = this.footerRepo.create();

    if (dto.imageMediaId) {
      const resolved = await this.mediaRelationService.linkMedia({
        mediaId: dto.imageMediaId,
        entityType: 'footer',
        entityId: footer.id ?? 'footer',
        field: 'logo',
      });
      footer.imageUrl = resolved.url;
    } else if (dto.imageUrl !== undefined) {
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

  async createFooterNavLink(dto: CreateFooterNavLinkDto) {
    const item = this.footerNavRepo.create({
      ...dto,
      sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.footerNavRepo)),
      status: dto.status ?? 'published',
    });
    return this.footerNavRepo.save(item);
  }

  async updateFooterNavLink(id: string, dto: UpdateFooterNavLinkDto) {
    const item = await this.footerNavRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Footer nav link "${id}" not found`);
    Object.assign(item, dto);
    return this.footerNavRepo.save(item);
  }

  async deleteFooterNavLink(id: string) {
    const item = await this.footerNavRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Footer nav link "${id}" not found`);
    await this.footerNavRepo.remove(item);
    return { success: true };
  }

  // Testimonials
  async getTestimonials(includeDrafts = true) {
    const where = includeDrafts ? {} : { status: 'published' };
    return this.testimonialRepo.find({ where, order: { sortOrder: 'ASC' } });
  }

  async createTestimonial(dto: CreateTestimonialDto) {
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

  async updateTestimonial(id: string, dto: UpdateTestimonialDto) {
    const item = await this.testimonialRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Testimonial "${id}" not found`);
    if (dto.avatarMediaId) {
      const resolved = await this.mediaRelationService.linkMedia({
        mediaId: dto.avatarMediaId,
        entityType: 'testimonial',
        entityId: id,
        field: 'avatar',
      });
      item.avatar = resolved.url;
    } else if (dto.avatar !== undefined) {
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

  async deleteTestimonial(id: string) {
    const item = await this.testimonialRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Testimonial "${id}" not found`);
    await this.testimonialRepo.remove(item);
    return { success: true };
  }

  // Certifications
  async getCertifications(includeDrafts = true) {
    const where = includeDrafts ? {} : { status: 'published' };
    return this.certificationRepo.find({ where, order: { sortOrder: 'ASC' } });
  }

  async createCertification(dto: CreateCertificationDto) {
    const item = this.certificationRepo.create({
      title: dto.title,
      subtitle: dto.subtitle,
      description: dto.description,
      date: dto.date,
      imageAlt: dto.imageAlt,
      image: dto.image,
      sortOrder:
        dto.sortOrder ?? (await this.nextSortOrder(this.certificationRepo)),
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

  async updateCertification(id: string, dto: UpdateCertificationDto) {
    const item = await this.certificationRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Certification "${id}" not found`);
    if (dto.imageMediaId) {
      const resolved = await this.mediaRelationService.linkMedia({
        mediaId: dto.imageMediaId,
        entityType: 'certification',
        entityId: id,
        field: 'image',
      });
      item.image = resolved.url;
    } else if (dto.image !== undefined) {
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

  async deleteCertification(id: string) {
    const item = await this.certificationRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Certification "${id}" not found`);
    await this.certificationRepo.remove(item);
    return { success: true };
  }

  // Pricing
  async getPricing(includeDrafts = true) {
    const where = includeDrafts ? {} : { status: 'published' };
    return this.pricingRepo.find({ where, order: { sortOrder: 'ASC' } });
  }

  async createPricingPlan(dto: CreatePricingPlanDto) {
    const item = this.pricingRepo.create({
      ...dto,
      sortOrder: dto.sortOrder ?? (await this.nextSortOrder(this.pricingRepo)),
      status: dto.status ?? 'published',
      features: dto.features ?? [],
    });
    return this.pricingRepo.save(item);
  }

  async updatePricingPlan(id: string, dto: UpdatePricingPlanDto) {
    const item = await this.pricingRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Pricing plan "${id}" not found`);
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

  async deletePricingPlan(id: string) {
    const item = await this.pricingRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Pricing plan "${id}" not found`);
    await this.pricingRepo.remove(item);
    return { success: true };
  }
}
