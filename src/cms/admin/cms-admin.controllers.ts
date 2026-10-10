import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CmsAdminService } from './cms-admin.service';
import {
  UpdateNavbarSettingsDto,
  CreateNavbarItemDto,
  UpdateNavbarItemDto,
  UpdateHeroDto,
  UpdateAboutDto,
  CreateServiceItemDto,
  UpdateServiceItemDto,
  CreateStackItemDto,
  UpdateStackItemDto,
  CreateSkillItemDto,
  UpdateSkillItemDto,
  CreateExperienceItemDto,
  UpdateExperienceItemDto,
  UpdateExperienceMetaDto,
  CreateSocialLinkDto,
  UpdateSocialLinkDto,
  UpdateContactDto,
  UpdateFooterDto,
  CreateFooterNavLinkDto,
  UpdateFooterNavLinkDto,
  CreateTestimonialDto,
  UpdateTestimonialDto,
  CreateCertificationDto,
  UpdateCertificationDto,
  CreatePricingPlanDto,
  UpdatePricingPlanDto,
} from './dto/cms-admin.dto';

@Controller('admin/navbar')
@UseGuards(JwtAuthGuard)
export class NavbarAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll() {
    return this.cms.getNavbar();
  }

  @Put('settings')
  updateSettings(@Body() dto: UpdateNavbarSettingsDto) {
    return this.cms.updateNavbarSettings(dto);
  }

  @Post('items')
  createItem(@Body() dto: CreateNavbarItemDto) {
    return this.cms.createNavbarItem(dto);
  }

  @Put('items/:id')
  updateItem(@Param('id') id: string, @Body() dto: UpdateNavbarItemDto) {
    return this.cms.updateNavbarItem(id, dto);
  }

  @Delete('items/:id')
  deleteItem(@Param('id') id: string) {
    return this.cms.deleteNavbarItem(id);
  }
}

@Controller('admin/hero')
@UseGuards(JwtAuthGuard)
export class HeroAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll() {
    return this.cms.getHero();
  }

  @Put()
  update(@Body() dto: UpdateHeroDto) {
    return this.cms.updateHero(dto);
  }
}

@Controller('admin/about')
@UseGuards(JwtAuthGuard)
export class AboutAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll() {
    return this.cms.getAbout();
  }

  @Put()
  update(@Body() dto: UpdateAboutDto) {
    return this.cms.updateAbout(dto);
  }
}

@Controller('admin/services')
@UseGuards(JwtAuthGuard)
export class ServicesAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll() {
    return this.cms.getServices();
  }

  @Post()
  create(@Body() dto: CreateServiceItemDto) {
    return this.cms.createService(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateServiceItemDto) {
    return this.cms.updateService(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cms.deleteService(id);
  }
}

@Controller('admin/stack')
@UseGuards(JwtAuthGuard)
export class StackAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll() {
    return this.cms.getStack();
  }

  @Post()
  create(@Body() dto: CreateStackItemDto) {
    return this.cms.createStackItem(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStackItemDto) {
    return this.cms.updateStackItem(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cms.deleteStackItem(id);
  }
}

@Controller('admin/skills')
@UseGuards(JwtAuthGuard)
export class SkillsAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll() {
    return this.cms.getSkills();
  }

  @Post()
  create(@Body() dto: CreateSkillItemDto) {
    return this.cms.createSkill(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSkillItemDto) {
    return this.cms.updateSkill(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cms.deleteSkill(id);
  }
}

@Controller('admin/experience')
@UseGuards(JwtAuthGuard)
export class ExperienceAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll() {
    return this.cms.getExperience();
  }

  @Put('meta')
  updateMeta(@Body() dto: UpdateExperienceMetaDto) {
    return this.cms.updateExperienceMeta(dto);
  }

  @Post('items')
  createItem(@Body() dto: CreateExperienceItemDto) {
    return this.cms.createExperienceItem(dto);
  }

  @Put('items/:id')
  updateItem(@Param('id') id: string, @Body() dto: UpdateExperienceItemDto) {
    return this.cms.updateExperienceItem(id, dto);
  }

  @Delete('items/:id')
  deleteItem(@Param('id') id: string) {
    return this.cms.deleteExperienceItem(id);
  }
}

@Controller('admin/social-links')
@UseGuards(JwtAuthGuard)
export class SocialLinksAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll(@Query('location') location?: 'hero' | 'footer') {
    return this.cms.getSocialLinks(location);
  }

  @Post()
  create(@Body() dto: CreateSocialLinkDto) {
    return this.cms.createSocialLink(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSocialLinkDto) {
    return this.cms.updateSocialLink(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cms.deleteSocialLink(id);
  }
}

@Controller('admin/contact')
@UseGuards(JwtAuthGuard)
export class ContactAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll() {
    return this.cms.getContact();
  }

  @Put()
  update(@Body() dto: UpdateContactDto) {
    return this.cms.updateContact(dto);
  }
}

@Controller('admin/footer')
@UseGuards(JwtAuthGuard)
export class FooterAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll() {
    return this.cms.getFooter();
  }

  @Put('settings')
  updateSettings(@Body() dto: UpdateFooterDto) {
    return this.cms.updateFooter(dto);
  }

  @Post('nav-links')
  createNavLink(@Body() dto: CreateFooterNavLinkDto) {
    return this.cms.createFooterNavLink(dto);
  }

  @Put('nav-links/:id')
  updateNavLink(@Param('id') id: string, @Body() dto: UpdateFooterNavLinkDto) {
    return this.cms.updateFooterNavLink(id, dto);
  }

  @Delete('nav-links/:id')
  deleteNavLink(@Param('id') id: string) {
    return this.cms.deleteFooterNavLink(id);
  }
}

@Controller('admin/testimonials')
@UseGuards(JwtAuthGuard)
export class TestimonialsAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll() {
    return this.cms.getTestimonials();
  }

  @Post()
  create(@Body() dto: CreateTestimonialDto) {
    return this.cms.createTestimonial(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) {
    return this.cms.updateTestimonial(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cms.deleteTestimonial(id);
  }
}

@Controller('admin/certifications')
@UseGuards(JwtAuthGuard)
export class CertificationsAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll() {
    return this.cms.getCertifications();
  }

  @Post()
  create(@Body() dto: CreateCertificationDto) {
    return this.cms.createCertification(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCertificationDto) {
    return this.cms.updateCertification(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cms.deleteCertification(id);
  }
}

@Controller('admin/pricing')
@UseGuards(JwtAuthGuard)
export class PricingAdminController {
  constructor(private readonly cms: CmsAdminService) {}

  @Get()
  findAll() {
    return this.cms.getPricing();
  }

  @Post()
  create(@Body() dto: CreatePricingPlanDto) {
    return this.cms.createPricingPlan(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePricingPlanDto) {
    return this.cms.updatePricingPlan(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cms.deletePricingPlan(id);
  }
}
