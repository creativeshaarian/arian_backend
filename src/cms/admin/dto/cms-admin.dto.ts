import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateNavbarSettingsDto {
  @IsOptional()
  @IsString()
  logoImage?: string;

  @IsOptional()
  @IsUUID()
  logoMediaId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  logoText?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  ctaText?: string;

  @IsOptional()
  @IsString()
  ctaHref?: string;
}

export class CreateNavbarItemDto {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  label!: string;

  @IsString()
  href!: string;

  @IsOptional()
  @IsIn(['main', 'utility'])
  placement?: 'main' | 'utility';

  @IsOptional()
  @IsInt()
  sortOrder?: number;

  @IsOptional()
  @IsIn(['published', 'draft'])
  status?: string;
}

export class UpdateNavbarItemDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  label?: string;

  @IsOptional()
  @IsString()
  href?: string;

  @IsOptional()
  @IsIn(['main', 'utility'])
  placement?: 'main' | 'utility';

  @IsOptional()
  @IsInt()
  sortOrder?: number;

  @IsOptional()
  @IsIn(['published', 'draft'])
  status?: string;
}

export class UpdateHeroDto {
  @IsOptional() @IsString() greeting?: string;
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() marqueeName?: string;
  @IsOptional() @IsString() profileImage?: string;
  @IsOptional() @IsUUID() profileMediaId?: string;
  @IsOptional() @IsString() profileAlt?: string;
  @IsOptional() @IsString() ctaText?: string;
  @IsOptional() @IsString() ctaHref?: string;
  @IsOptional() @IsString() ctaIcon?: string;
  @IsOptional() @IsString() secondaryCtaText?: string;
  @IsOptional() @IsString() secondaryCtaHref?: string;
  @IsOptional() @IsArray() backgroundImages?: string[];
  @IsOptional() @IsArray() floatingImages?: string[];
  @IsOptional() @IsArray() badges?: string[];
  @IsOptional()
  statistics?: Array<{ label: string; value: string }>;
}

export class UpdateAboutDto {
  @IsOptional() @IsString() heading?: string;
  @IsOptional() @IsString() text?: string;
  @IsOptional() @IsString() profileImage?: string;
  @IsOptional() @IsUUID() profileMediaId?: string;
  @IsOptional() @IsInt() experienceYears?: number;
  @IsOptional()
  features?: Array<{ title: string; description: string; icon?: string }>;
}

export class CreateServiceItemDto {
  @IsString() number!: string;
  @IsString() title!: string;
  @IsString() description!: string;
  @IsOptional() @IsString() shapeImage?: string;
  @IsOptional() @IsUUID() shapeMediaId?: string;
  @IsOptional() @IsString() shapeAlt?: string;
  @IsOptional() @IsInt() rotate?: number;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsIn(['published', 'draft']) status?: string;
}

export class UpdateServiceItemDto extends CreateServiceItemDto {}

export class CreateStackItemDto {
  @IsString() name!: string;
  @IsString() description!: string;
  @IsOptional() @IsString() icon?: string;
  @IsOptional() @IsUUID() iconMediaId?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsInt() progress?: number;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsIn(['published', 'draft']) status?: string;
}

export class UpdateStackItemDto extends CreateStackItemDto {}

export class CreateSkillItemDto {
  @IsString() name!: string;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsIn(['published', 'draft']) status?: string;
}

export class UpdateSkillItemDto extends CreateSkillItemDto {}

export class CreateExperienceItemDto {
  @IsOptional() @IsString() slug?: string;
  @IsString() duration!: string;
  @IsString() position!: string;
  @IsString() company!: string;
  @IsString() description!: string;
  @IsOptional() @IsString() logoImage?: string;
  @IsOptional() @IsUUID() logoMediaId?: string;
  @IsOptional() @IsString() hoverImage?: string;
  @IsOptional() @IsUUID() hoverMediaId?: string;
  @IsOptional() @IsString() hoverImageAlt?: string;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsIn(['published', 'draft']) status?: string;
}

export class UpdateExperienceItemDto extends CreateExperienceItemDto {}

export class UpdateExperienceMetaDto {
  @IsString() cvHref!: string;
}

export class CreateSocialLinkDto {
  @IsString() label!: string;
  @IsString() href!: string;
  @IsOptional() @IsString() platform?: string;
  @IsOptional() @IsString() iconUrl?: string;
  @IsOptional() @IsUUID() iconMediaId?: string;
  @IsOptional() @IsIn(['hero', 'footer']) location?: 'hero' | 'footer';
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsIn(['published', 'draft']) status?: string;
}

export class UpdateSocialLinkDto {
  @IsOptional() @IsString() label?: string;
  @IsOptional() @IsString() href?: string;
  @IsOptional() @IsString() platform?: string;
  @IsOptional() @IsString() iconUrl?: string;
  @IsOptional() @IsUUID() iconMediaId?: string;
  @IsOptional() @IsIn(['hero', 'footer']) location?: 'hero' | 'footer';
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsIn(['published', 'draft']) status?: string;
}

export class UpdateContactDto {
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() phoneHref?: string;
  @IsOptional() @IsString() emailHref?: string;
  @IsOptional() formSettings?: Record<string, unknown>;
}

export class UpdateFooterDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() imageUrl?: string;
  @IsOptional() @IsUUID() imageMediaId?: string;
  @IsOptional() @IsString() imageAlt?: string;
  @IsOptional() @IsString() copyright?: string;
}

export class CreateFooterNavLinkDto {
  @IsString() label!: string;
  @IsString() href!: string;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsIn(['published', 'draft']) status?: string;
}

export class UpdateFooterNavLinkDto extends CreateFooterNavLinkDto {}

export class CreateTestimonialDto {
  @IsString() name!: string;
  @IsString() role!: string;
  @IsString() quote!: string;
  @IsOptional() @IsString() avatar?: string;
  @IsOptional() @IsUUID() avatarMediaId?: string;
  @IsOptional() @IsInt() rating?: number;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsIn(['published', 'draft']) status?: string;
}

export class UpdateTestimonialDto extends CreateTestimonialDto {}

export class CreateCertificationDto {
  @IsString() title!: string;
  @IsOptional() @IsString() subtitle?: string;
  @IsString() description!: string;
  @IsString() date!: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsUUID() imageMediaId?: string;
  @IsOptional() @IsString() imageAlt?: string;
  @IsOptional() @IsString() credentialUrl?: string;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsIn(['published', 'draft']) status?: string;
}

export class UpdateCertificationDto extends CreateCertificationDto {}

export class CreatePricingPlanDto {
  @IsString() name!: string;
  @IsString() tagline!: string;
  @IsString() price!: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsArray() @IsString({ each: true }) features?: string[];
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsIn(['published', 'draft']) status?: string;
}

export class UpdatePricingPlanDto extends CreatePricingPlanDto {}

export class AddProjectImageDto {
  @IsOptional() @IsString() url?: string;
  @IsOptional() @IsUUID() mediaId?: string;
  @IsOptional() @IsString() alt?: string;
  @IsOptional() @IsIn(['cover', 'gallery', 'hero']) type?: 'cover' | 'gallery' | 'hero';
  @IsOptional() @IsInt() sortOrder?: number;
}
