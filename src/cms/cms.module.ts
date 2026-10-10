import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentSection } from '../content/entities/content-section.entity';
import { CmsAggregatorService } from './cms-aggregator.service';
import { CmsNormalizedService } from './cms-normalized.service';
import { CmsMigrationService } from './cms-migration.service';
import { CmsAdminService } from './admin/cms-admin.service';
import {
  NavbarAdminController,
  HeroAdminController,
  AboutAdminController,
  ServicesAdminController,
  StackAdminController,
  SkillsAdminController,
  ExperienceAdminController,
  SocialLinksAdminController,
  ContactAdminController,
  FooterAdminController,
  TestimonialsAdminController,
  CertificationsAdminController,
  PricingAdminController,
} from './admin/cms-admin.controllers';
import { CacheAdminController } from './admin/cache-admin.controller';
import { ProjectsModule } from '../projects/projects.module';
import { BlogModule } from '../blog/blog.module';
import { MediaModule } from '../media/media.module';
import { SettingsModule } from '../settings/settings.module';
import { SiteSetting } from './entities/site-setting.entity';
import { NavbarSetting } from './entities/navbar-setting.entity';
import { NavbarItem } from './entities/navbar-item.entity';
import { HeroSetting } from './entities/hero-setting.entity';
import { AboutSetting } from './entities/about-setting.entity';
import { ServiceItem } from './entities/service-item.entity';
import { StackItem } from './entities/stack-item.entity';
import { SkillItem } from './entities/skill-item.entity';
import { ExperienceItem } from './entities/experience-item.entity';
import { ProjectImage } from './entities/project-image.entity';
import { SocialLink } from './entities/social-link.entity';
import { ContactSetting } from './entities/contact-setting.entity';
import { FooterSetting } from './entities/footer-setting.entity';
import { FooterNavLink } from './entities/footer-nav-link.entity';
import { Testimonial } from './entities/testimonial.entity';
import { CertificationItem } from './entities/certification-item.entity';
import { PricingPlan } from './entities/pricing-plan.entity';

const cmsEntities = [
  SiteSetting,
  NavbarSetting,
  NavbarItem,
  HeroSetting,
  AboutSetting,
  ServiceItem,
  StackItem,
  SkillItem,
  ExperienceItem,
  ProjectImage,
  SocialLink,
  ContactSetting,
  FooterSetting,
  FooterNavLink,
  Testimonial,
  CertificationItem,
  PricingPlan,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentSection, ...cmsEntities]),
    ProjectsModule,
    BlogModule,
    MediaModule,
    SettingsModule,
  ],
  controllers: [
    NavbarAdminController,
    HeroAdminController,
    AboutAdminController,
    ServicesAdminController,
    StackAdminController,
    SkillsAdminController,
    ExperienceAdminController,
    SocialLinksAdminController,
    ContactAdminController,
    FooterAdminController,
    TestimonialsAdminController,
    CertificationsAdminController,
    PricingAdminController,
    CacheAdminController,
  ],
  providers: [
    CmsAggregatorService,
    CmsNormalizedService,
    CmsMigrationService,
    CmsAdminService,
  ],
  exports: [
    CmsAggregatorService,
    CmsNormalizedService,
    CmsMigrationService,
    CmsAdminService,
  ],
})
export class CmsModule {}
