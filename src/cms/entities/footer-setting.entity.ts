import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('footer_settings')
export class FooterSetting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true, name: 'image_url' })
  imageUrl?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'image_alt' })
  imageAlt?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  copyright?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
