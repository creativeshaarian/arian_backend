import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('blog_posts')
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  slug!: string;

  @Column({ type: 'varchar', length: 512 })
  title!: string;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'title_accent' })
  titleAccent?: string;

  @Column({ type: 'text' })
  excerpt!: string;

  @Column({ type: 'varchar', length: 64 })
  category!: string;

  @Column({ type: 'varchar', length: 128, name: 'category_label' })
  categoryLabel!: string;

  @Column({ type: 'varchar', length: 128 })
  author!: string;

  @Column({ type: 'varchar', length: 32, name: 'reading_time' })
  readingTime!: string;

  @Column({ type: 'varchar', length: 32 })
  date!: string;

  @Column({ type: 'date', name: 'date_iso' })
  dateISO!: string;

  @Column({ type: 'text' })
  image!: string;

  @Column({ type: 'char', length: 36, nullable: true, name: 'image_media_id' })
  imageMediaId?: string;

  @Column({ type: 'varchar', length: 255, name: 'image_alt' })
  imageAlt!: string;

  @Column({ type: 'json', nullable: true })
  article?: unknown;

  @Column({ type: 'varchar', length: 32, default: 'published' })
  status!: string;

  @Column({ type: 'int', default: 0 })
  sortOrder!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
