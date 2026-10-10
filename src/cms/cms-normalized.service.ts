import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSetting } from './entities/site-setting.entity';
import { HeroSetting } from './entities/hero-setting.entity';
import { NavbarItem } from './entities/navbar-item.entity';
import { NavbarSetting } from './entities/navbar-setting.entity';
import { AboutSetting } from './entities/about-setting.entity';
import { ServiceItem } from './entities/service-item.entity';
import { StackItem } from './entities/stack-item.entity';
import { SkillItem } from './entities/skill-item.entity';
import { ExperienceItem } from './entities/experience-item.entity';
import { SocialLink } from './entities/social-link.entity';
import { ContactSetting } from './entities/contact-setting.entity';
import { FooterSetting } from './entities/footer-setting.entity';
import { FooterNavLink } from './entities/footer-nav-link.entity';
import { Testimonial } from './entities/testimonial.entity';
import { CertificationItem } from './entities/certification-item.entity';
import { PricingPlan } from './entities/pricing-plan.entity';
import { SiteContent } from '../content/content.types';

@Injectable()
export class CmsNormalizedService {
  constructor(
    @InjectRepository(SiteSetting)
    private readonly siteSettingRepo: Repository<SiteSetting>,
    @InjectRepository(HeroSetting)
    private readonly heroRepo: Repository<HeroSetting>,
    @InjectRepository(NavbarItem)
    private readonly navbarItemRepo: Repository<NavbarItem>,
    @InjectRepository(NavbarSetting)
    private readonly navbarSettingRepo: Repository<NavbarSetting>,
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
  ) {}

  async isMigrated(): Promise<boolean> {
    const flag = await this.siteSettingRepo.findOne({
      where: { key: 'cms_migrated' },
    });
    if (flag) return true;

    const heroCount = await this.heroRepo.count();
    if (heroCount === 0) return false;

    const again = await this.siteSettingRepo.findOne({
      where: { key: 'cms_migrated' },
    });
    if (again) return true;

    try {
      await this.siteSettingRepo.save(
        this.siteSettingRepo.create({
          key: 'cms_migrated',
          value: {
            migratedAt: new Date().toISOString(),
            version: 2,
            source: 'normalized-auto',
          },
        }),
      );
    } catch {
      // Unique key race — another request already wrote the flag.
    }
    return true;
  }

  async buildPartialContent(): Promise<Partial<SiteContent>> {
    const migrated = await this.isMigrated();
    if (!migrated) return {};

    const content: Partial<SiteContent> = {};

    const site = await this.siteSettingRepo.findOne({ where: { key: 'site' } });
    if (site) content.site = site.value;

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
      cvHref: (expMeta?.value as { cvHref?: string })?.cvHref ?? '#',
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
      platform: (s.platform || 'custom') as never,
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
          icon: (s.platform || 'custom') as never,
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
}
