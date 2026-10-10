import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('media_assets')
export class MediaAsset {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  filename!: string;

  @Column({ type: 'varchar', length: 255, name: 'original_name' })
  originalName!: string;

  @Column({ type: 'text' })
  url!: string;

  @Column({ type: 'varchar', length: 128, name: 'mime_type' })
  mimeType!: string;

  @Column({ type: 'int', default: 0 })
  size!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alt?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  folder?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
