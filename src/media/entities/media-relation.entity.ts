import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { MediaAsset } from '../../media/entities/media-asset.entity';
import type { MediaEntityType, MediaFieldRole } from '../../cms/constants/cms.constants';

@Entity('media_relations')
@Index(['entityType', 'entityId', 'field'])
export class MediaRelation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'char', length: 36, name: 'media_id' })
  mediaId!: string;

  @ManyToOne(() => MediaAsset, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'media_id' })
  media!: MediaAsset;

  @Column({ type: 'varchar', length: 32, name: 'entity_type' })
  entityType!: MediaEntityType;

  @Column({ type: 'varchar', length: 36, name: 'entity_id' })
  entityId!: string;

  @Column({ type: 'varchar', length: 32 })
  field!: MediaFieldRole;

  @Column({ type: 'int', default: 0, name: 'sort_order' })
  sortOrder!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
