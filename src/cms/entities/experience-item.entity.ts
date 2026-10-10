import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('experience_items')
export class ExperienceItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  slug?: string;

  @Column({ type: 'varchar', length: 64 })
  duration!: string;

  @Column({ type: 'varchar', length: 255 })
  position!: string;

  @Column({ type: 'varchar', length: 255 })
  company!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text', nullable: true, name: 'logo_image' })
  logoImage?: string;

  @Column({ type: 'text', nullable: true, name: 'hover_image' })
  hoverImage?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'hover_image_alt' })
  hoverImageAlt?: string;

  @Column({ type: 'int', default: 0, name: 'sort_order' })
  sortOrder!: number;

  @Column({ type: 'varchar', length: 32, default: 'published' })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
