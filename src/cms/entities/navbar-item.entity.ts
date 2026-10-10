import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('navbar_items')
export class NavbarItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 128 })
  label!: string;

  @Column({ type: 'text' })
  href!: string;

  /** main = section menu; utility = right custom links (Behance, Resume, …) */
  @Column({ type: 'varchar', length: 32, default: 'main' })
  placement!: 'main' | 'utility';

  @Column({ type: 'int', default: 0, name: 'sort_order' })
  sortOrder!: number;

  @Column({ type: 'varchar', length: 32, default: 'published' })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
