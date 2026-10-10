import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentSection } from '../content/entities/content-section.entity';
import { SiteSetting } from './entities/site-setting.entity';
import { NavbarItem } from './entities/navbar-item.entity';
import { HeroSetting } from './entities/hero-setting.entity';
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
import { PricingPlan } from './entities/pricing-plan.entity';
import { SiteContent } from '../content/content.types';

@Injectable()
export class CmsMigrationService implements OnModuleInit {
  constructor(
    @InjectRepository(ContentSection)
    private readonly contentRepo: Repository<ContentSection>,
    @InjectRepository(SiteSetting)
    private readonly siteSettingRepo: Repository<SiteSetting>,
    @InjectRepository(HeroSetting)
    private readonly heroRepo: Repository<HeroSetting>,
    @InjectRepository(NavbarItem)
    private readonly navbarItemRepo: Repository<NavbarItem>,
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
    @InjectRepository(PricingPlan)
    private readonly pricingRepo: Repository<PricingPlan>,
  ) {}

  async onModuleInit() {
    await this.ensureCmsMigratedFlag();
    const heroCount = await this.heroRepo.count();
    if (heroCount > 0) return;
    await this.migrateFromContentSections();
  }

  /** If relational CMS tables already have data but flag is missing, set it. */
  private async ensureCmsMigratedFlag() {
    const flag = await this.siteSettingRepo.findOne({
      where: { key: 'cms_migrated' },
    });
    if (flag) return;

    const heroCount = await this.heroRepo.count();
    if (heroCount === 0) return;

    const existing = await this.siteSettingRepo.findOne({
      where: { key: 'cms_migrated' },
    });
    if (existing) return;

    await this.siteSettingRepo.save(
      this.siteSettingRepo.create({
        key: 'cms_migrated',
        value: {
          migratedAt: new Date().toISOString(),
          version: 2,
          source: 'auto-detect',
        },
      }),
    );
  }

  async migrateFromContentSections() {
    const rows = await this.contentRepo.find();
    const content: SiteContent = {};
    for (const row of rows) {
      content[row.key] = row.data;
    }
    if (Object.keys(content).length === 0) return;

    if (content.site) {
      await this.siteSettingRepo.save({
        key: 'site',
        value: content.site,
      });
    }

    if (content.hero) {
      const hero = content.hero as Record<string, unknown>;
      await this.heroRepo.save(
        this.heroRepo.create({
          greeting: hero.greeting as string,
          name: hero.name as string,
          marqueeName: hero.marqueeName as string,
          profileImage: hero.profileImage as string,
          profileAlt: hero.profileAlt as string,
          ctaText: hero.ctaText as string,
          ctaHref: hero.ctaHref as string,
        }),
      );
    }

    if (Array.isArray(content.navLinks)) {
      await this.navbarItemRepo.clear();
      const items = (content.navLinks as Array<{ label: string; href: string }>).map(
        (link, index) =>
          this.navbarItemRepo.create({
            label: link.label,
            href: link.href,
            sortOrder: index,
            status: 'published',
          }),
      );
      if (items.length) await this.navbarItemRepo.save(items);
    }

    if (content.about) {
      const about = content.about as Record<string, unknown>;
      await this.aboutRepo.save(
        this.aboutRepo.create({
          heading: about.heading as string,
          text: about.text as string,
        }),
      );
    }

    if (Array.isArray(content.services)) {
      await this.serviceRepo.clear();
      const services = (
        content.services as Array<{
          id?: string;
          number: string;
          title: string;
          description: string;
          shape?: string;
          shapeAlt?: string;
          rotate?: number;
        }>
      ).map((item, index) =>
        this.serviceRepo.create({
          number: item.number,
          title: item.title,
          description: item.description,
          shapeImage: item.shape,
          shapeAlt: item.shapeAlt,
          rotate: item.rotate,
          sortOrder: index,
          status: 'published',
        }),
      );
      if (services.length) await this.serviceRepo.save(services);
    }

    if (Array.isArray(content.stack)) {
      await this.stackRepo.clear();
      const stack = (
        content.stack as Array<{ id?: string; name: string; description: string }>
      ).map((item, index) =>
        this.stackRepo.create({
          name: item.name,
          description: item.description,
          sortOrder: index,
          status: 'published',
        }),
      );
      if (stack.length) await this.stackRepo.save(stack);
    }

    if (Array.isArray(content.skills)) {
      await this.skillRepo.clear();
      const skills = (content.skills as string[]).map((name, index) =>
        this.skillRepo.create({ name, sortOrder: index, status: 'published' }),
      );
      if (skills.length) await this.skillRepo.save(skills);
    }

    if (content.experience) {
      const exp = content.experience as {
        cvHref?: string;
        items?: Array<{
          id?: string;
          duration: string;
          position: string;
          company: string;
          description: string;
          hoverImage?: string;
          hoverImageAlt?: string;
        }>;
      };
      await this.siteSettingRepo.save({
        key: 'experience_meta',
        value: { cvHref: exp.cvHref ?? '#' },
      });
      if (Array.isArray(exp.items)) {
        await this.experienceRepo.clear();
        const items = exp.items.map((item, index) =>
          this.experienceRepo.create({
            slug: item.id,
            duration: item.duration,
            position: item.position,
            company: item.company,
            description: item.description,
            hoverImage: item.hoverImage,
            hoverImageAlt: item.hoverImageAlt,
            sortOrder: index,
            status: 'published',
          }),
        );
        if (items.length) await this.experienceRepo.save(items);
      }
    }

    if (Array.isArray(content.socialLinks)) {
      await this.socialRepo.clear();
      const links = (
        content.socialLinks as Array<{
          label: string;
          href: string;
          platform: string;
        }>
      ).map((link, index) =>
        this.socialRepo.create({
          label: link.label,
          href: link.href,
          platform: link.platform,
          location: 'hero',
          sortOrder: index,
          status: 'published',
        }),
      );
      if (links.length) await this.socialRepo.save(links);
    }

    if (content.footer) {
      const footer = content.footer as Record<string, unknown>;
      const image = footer.image as { src?: string; alt?: string } | undefined;
      const contact = footer.contact as Record<string, string> | undefined;
      await this.footerRepo.save(
        this.footerRepo.create({
          title: footer.title as string,
          description: footer.description as string,
          imageUrl: image?.src,
          imageAlt: image?.alt,
          copyright: footer.copyright as string,
        }),
      );
      if (contact) {
        await this.contactRepo.save(
          this.contactRepo.create({
            email: contact.email,
            phone: contact.phone,
            phoneHref: contact.phoneHref,
            emailHref: contact.emailHref,
          }),
        );
      }
      if (Array.isArray(footer.navLinks)) {
        await this.footerNavRepo.clear();
        const navLinks = (
          footer.navLinks as Array<{ label: string; href: string }>
        ).map((link, index) =>
          this.footerNavRepo.create({
            label: link.label,
            href: link.href,
            sortOrder: index,
            status: 'published',
          }),
        );
        if (navLinks.length) await this.footerNavRepo.save(navLinks);
      }
      if (Array.isArray(footer.socialLinks)) {
        const footerSocials = (
          footer.socialLinks as Array<{
            label: string;
            href: string;
            icon: string;
          }>
        ).map((link, index) =>
          this.socialRepo.create({
            label: link.label,
            href: link.href,
            platform: link.icon,
            location: 'footer',
            sortOrder: index,
            status: 'published',
          }),
        );
        if (footerSocials.length) await this.socialRepo.save(footerSocials);
      }
    }

    if (Array.isArray(content.testimonials)) {
      await this.testimonialRepo.clear();
      const items = (
        content.testimonials as Array<{
          id?: string;
          name: string;
          role: string;
          quote: string;
          avatar: string;
        }>
      ).map((item, index) =>
        this.testimonialRepo.create({
          name: item.name,
          role: item.role,
          quote: item.quote,
          avatar: item.avatar,
          sortOrder: index,
          status: 'published',
        }),
      );
      if (items.length) await this.testimonialRepo.save(items);
    }

    if (Array.isArray(content.pricingPlans)) {
      await this.pricingRepo.clear();
      const plans = (
        content.pricingPlans as Array<{
          id?: string;
          name: string;
          tagline: string;
          price: string;
          featured?: boolean;
          features: string[];
        }>
      ).map((plan, index) =>
        this.pricingRepo.create({
          name: plan.name,
          tagline: plan.tagline,
          price: plan.price,
          featured: plan.featured ?? false,
          features: plan.features,
          sortOrder: index,
          status: 'published',
        }),
      );
      if (plans.length) await this.pricingRepo.save(plans);
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
}
