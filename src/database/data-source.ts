import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ContentSection } from '../content/entities/content-section.entity';
import { Project } from '../projects/entities/project.entity';
import { BlogPost } from '../blog/entities/blog-post.entity';
import { BlogCategory } from '../blog/entities/blog-category.entity';
import { AdminUser } from '../auth/entities/admin-user.entity';
import { MediaAsset } from '../media/entities/media-asset.entity';
import { MediaRelation } from '../media/entities/media-relation.entity';
import { SiteSetting } from '../cms/entities/site-setting.entity';
import { NavbarSetting } from '../cms/entities/navbar-setting.entity';
import { NavbarItem } from '../cms/entities/navbar-item.entity';
import { HeroSetting } from '../cms/entities/hero-setting.entity';
import { AboutSetting } from '../cms/entities/about-setting.entity';
import { ServiceItem } from '../cms/entities/service-item.entity';
import { StackItem } from '../cms/entities/stack-item.entity';
import { SkillItem } from '../cms/entities/skill-item.entity';
import { ExperienceItem } from '../cms/entities/experience-item.entity';
import { ProjectImage } from '../cms/entities/project-image.entity';
import { SocialLink } from '../cms/entities/social-link.entity';
import { ContactSetting } from '../cms/entities/contact-setting.entity';
import { FooterSetting } from '../cms/entities/footer-setting.entity';
import { FooterNavLink } from '../cms/entities/footer-nav-link.entity';
import { Testimonial } from '../cms/entities/testimonial.entity';
import { CertificationItem } from '../cms/entities/certification-item.entity';
import { PricingPlan } from '../cms/entities/pricing-plan.entity';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.DB_DATABASE ?? process.env.DB_NAME ?? 'shaarian_db',
  charset: 'utf8mb4',
  entities: [
    ContentSection,
    Project,
    BlogPost,
    BlogCategory,
    AdminUser,
    MediaAsset,
    MediaRelation,
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
  ],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'typeorm_migrations',
});
