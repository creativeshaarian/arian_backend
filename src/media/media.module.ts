import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaAsset } from './entities/media-asset.entity';
import { MediaRelation } from './entities/media-relation.entity';
import { MediaService } from './media.service';
import { MediaRelationService } from './media-relation.service';
import { MediaController } from './media.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MediaAsset, MediaRelation])],
  controllers: [MediaController],
  providers: [MediaService, MediaRelationService],
  exports: [MediaService, MediaRelationService],
})
export class MediaModule {}
