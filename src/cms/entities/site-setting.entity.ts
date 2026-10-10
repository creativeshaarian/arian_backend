import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('site_settings')
export class SiteSetting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  key!: string;

  @Column({ type: 'json' })
  value!: unknown;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
