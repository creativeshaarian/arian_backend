import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SettingsService } from './settings.service';
import { UpdateSiteMetaDto, UpdateSectionVisibilityDto } from './dto/settings.dto';

@Controller('admin/settings')
@UseGuards(JwtAuthGuard)
export class SettingsAdminController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  findAll() {
    return this.settingsService.getPublicSettings();
  }

  @Put()
  updateSite(@Body() dto: UpdateSiteMetaDto) {
    return this.settingsService.updateSiteMeta(dto);
  }

  @Put('sections')
  updateSections(@Body() dto: UpdateSectionVisibilityDto) {
    return this.settingsService.updateSectionVisibility(
      dto.sections,
      dto.order,
    );
  }
}
