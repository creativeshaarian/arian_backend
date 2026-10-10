import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateContentDto } from './dto/update-content.dto';
import { ResetContentDto } from './dto/reset-content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':section')
  findSection(@Param('section') section: string) {
    return this.contentService.findSection(section);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() dto: UpdateContentDto) {
    return this.contentService.updateSection(dto.section, dto.data);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  reset(@Body() dto: ResetContentDto) {
    if (dto.action === 'reset') {
      return this.contentService.reset();
    }
    return { error: 'Unknown action' };
  }
}
