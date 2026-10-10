import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('certifications')
export class CertificationItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subtitle?: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 64 })
  date!: string;

  @Column({ type: 'text', nullable: true })
  image?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'image_alt' })
  imageAlt?: string;

  @Column({ type: 'text', nullable: true, name: 'credential_url' })
  credentialUrl?: string;

  @Column({ type: 'int', default: 0, name: 'sort_order' })
  sortOrder!: number;

  @Column({ type: 'varchar', length: 32, default: 'published' })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
