import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentSection } from './entities/content-section.entity';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ProjectsModule } from '../projects/projects.module';
import { BlogModule } from '../blog/blog.module';
import { CmsModule } from '../cms/cms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentSection]),
    ProjectsModule,
    BlogModule,
    CmsModule,
  ],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
