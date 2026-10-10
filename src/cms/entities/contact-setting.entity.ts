import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contact_settings')
export class ContactSetting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 64, nullable: true, name: 'phone_href' })
  phoneHref?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'email_href' })
  emailHref?: string;

  @Column({ type: 'json', nullable: true, name: 'form_settings' })
  formSettings?: Record<string, unknown>;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
