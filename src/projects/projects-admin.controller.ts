import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectsService } from './projects.service';
import { ProjectImagesService } from './project-images.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddProjectImageDto } from '../cms/admin/dto/cms-admin.dto';

@Controller('admin/projects')
@UseGuards(JwtAuthGuard)
export class ProjectsAdminController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly projectImagesService: ProjectImagesService,
  ) {}

  @Get()
  findAll() {
    return this.projectsService.findAll(true);
  }

  @Post(':id/images')
  addImage(@Param('id') id: string, @Body() dto: AddProjectImageDto) {
    return this.projectImagesService.addImage(id, dto);
  }

  @Delete(':id/images/:imageId')
  removeImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
  ) {
    return this.projectImagesService.removeImage(id, imageId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const project = await this.projectsService.findEntityById(id);
    const images = await this.projectImagesService.findByProjectId(id);
    return { ...project, images };
  }

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
