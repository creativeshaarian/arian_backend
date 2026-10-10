import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('about_settings')
export class AboutSetting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  heading?: string;

  @Column({ type: 'text', nullable: true })
  text?: string;

  @Column({ type: 'text', nullable: true, name: 'profile_image' })
  profileImage?: string;

  @Column({ type: 'int', nullable: true, name: 'experience_years' })
  experienceYears?: number;

  @Column({ type: 'json', nullable: true })
  features?: Array<{ title: string; description: string; icon?: string }>;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
