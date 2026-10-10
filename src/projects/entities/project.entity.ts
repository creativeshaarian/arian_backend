import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  slug!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 128 })
  category!: string;

  @Column({ type: 'varchar', length: 128 })
  client!: string;

  @Column({ type: 'varchar', length: 64 })
  duration!: string;

  @Column({ type: 'text' })
  image!: string;

  @Column({ type: 'char', length: 36, nullable: true, name: 'cover_media_id' })
  coverMediaId?: string;

  @Column({ type: 'json', nullable: true })
  gallery!: string[];

  @Column({ type: 'text', nullable: true, name: 'hero_background' })
  heroBackground?: string;

  @Column({ type: 'varchar', length: 32, nullable: true, name: 'hero_layout' })
  heroLayout?: 'full' | 'container';

  @Column({ type: 'text', name: 'preview_href' })
  previewHref!: string;

  @Column({ type: 'text', name: 'cta_href' })
  ctaHref!: string;

  @Column({ type: 'varchar', length: 64, name: 'cta_label' })
  ctaLabel!: string;

  @Column({ type: 'text' })
  summary!: string;

  @Column({ type: 'json', nullable: true })
  content!: Array<{ type: string; text: string }>;

  @Column({ type: 'text', nullable: true, name: 'github_url' })
  githubUrl?: string;

  @Column({ type: 'text', nullable: true, name: 'live_url' })
  liveUrl?: string;

  @Column({ type: 'boolean', default: false })
  featured!: boolean;

  @Column({ type: 'json', nullable: true })
  technologies?: string[];

  @Column({ type: 'varchar', length: 32, default: 'published' })
  status!: string;

  @Column({ type: 'int', default: 0 })
  sortOrder!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
