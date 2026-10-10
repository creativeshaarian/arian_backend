import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pricing_plans')
export class PricingPlan {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 128 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  tagline!: string;

  @Column({ type: 'varchar', length: 64 })
  price!: string;

  @Column({ type: 'boolean', default: false })
  featured!: boolean;

  @Column({ type: 'json', nullable: true })
  features?: string[];

  @Column({ type: 'int', default: 0, name: 'sort_order' })
  sortOrder!: number;

  @Column({ type: 'varchar', length: 32, default: 'published' })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
