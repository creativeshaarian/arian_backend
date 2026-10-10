import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('navbar_settings')
export class NavbarSetting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: true, name: 'logo_image' })
  logoImage?: string;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'logo_text' })
  logoText?: string;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'cta_text' })
  ctaText?: string;

  @Column({ type: 'text', nullable: true, name: 'cta_href' })
  ctaHref?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
