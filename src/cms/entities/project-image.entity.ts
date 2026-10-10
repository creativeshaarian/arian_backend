import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('project_images')
export class ProjectImage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 36,
    name: 'project_id',
    charset: 'latin1',
    collation: 'latin1_swedish_ci',
  })
  projectId!: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project!: Project;

  @Column({ type: 'text' })
  url!: string;

  @Column({ type: 'char', length: 36, nullable: true, name: 'media_id' })
  mediaId?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alt?: string;

  @Column({ type: 'varchar', length: 32, default: 'gallery' })
  type!: 'cover' | 'gallery' | 'hero';

  @Column({ type: 'int', default: 0, name: 'sort_order' })
  sortOrder!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
