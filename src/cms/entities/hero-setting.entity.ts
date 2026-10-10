import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('hero_settings')
export class HeroSetting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  greeting?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'marquee_name' })
  marqueeName?: string;

  @Column({ type: 'text', nullable: true, name: 'profile_image' })
  profileImage?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'profile_alt' })
  profileAlt?: string;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'cta_text' })
  ctaText?: string;

  @Column({ type: 'text', nullable: true, name: 'cta_href' })
  ctaHref?: string;

  @Column({ type: 'varchar', length: 512, nullable: true, name: 'cta_icon' })
  ctaIcon?: string;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'secondary_cta_text' })
  secondaryCtaText?: string;

  @Column({ type: 'text', nullable: true, name: 'secondary_cta_href' })
  secondaryCtaHref?: string;

  @Column({ type: 'json', nullable: true, name: 'background_images' })
  backgroundImages?: string[];

  @Column({ type: 'json', nullable: true, name: 'floating_images' })
  floatingImages?: string[];

  @Column({ type: 'json', nullable: true })
  badges?: string[];

  @Column({ type: 'json', nullable: true })
  statistics?: Array<{ label: string; value: string }>;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
