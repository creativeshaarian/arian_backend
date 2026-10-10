import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsAdminController } from './projects-admin.controller';
import { ProjectImagesService } from './project-images.service';
import { ProjectImage } from '../cms/entities/project-image.entity';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectImage]),
    MediaModule,
  ],
  controllers: [ProjectsController, ProjectsAdminController],
  providers: [ProjectsService, ProjectImagesService],
  exports: [ProjectsService, ProjectImagesService],
})
export class ProjectsModule {}
