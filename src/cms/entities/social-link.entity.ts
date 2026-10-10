import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('social_links')
export class SocialLink {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 128 })
  label!: string;

  @Column({ type: 'text' })
  href!: string;

  /** Optional slug for legacy/fallback; prefer iconUrl for custom SVG */
  @Column({ type: 'varchar', length: 64, default: 'custom' })
  platform!: string;

  @Column({ type: 'text', nullable: true, name: 'icon_url' })
  iconUrl?: string;

  @Column({ type: 'char', length: 36, nullable: true, name: 'icon_media_id' })
  iconMediaId?: string;

  @Column({ type: 'varchar', length: 32, default: 'hero' })
  location!: 'hero' | 'footer';

  @Column({ type: 'int', default: 0, name: 'sort_order' })
  sortOrder!: number;

  @Column({ type: 'varchar', length: 32, default: 'published' })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
