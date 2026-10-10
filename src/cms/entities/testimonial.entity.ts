import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 128 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  role!: string;

  @Column({ type: 'text' })
  quote!: string;

  @Column({ type: 'text', nullable: true })
  avatar?: string;

  @Column({ type: 'int', nullable: true })
  rating?: number;

  @Column({ type: 'int', default: 0, name: 'sort_order' })
  sortOrder!: number;

  @Column({ type: 'varchar', length: 32, default: 'published' })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
