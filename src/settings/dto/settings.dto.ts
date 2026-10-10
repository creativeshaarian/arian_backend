import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateSiteMetaDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title!: string;

  @IsString()
  @MinLength(1)
  description!: string;

  @IsOptional()
  @IsString()
  favicon?: string;

  @IsOptional()
  @IsString()
  faviconMediaId?: string;

  @IsOptional()
  @IsString()
  frontendTheme?: 'light' | 'dark';
}

/**
 * Accept any section keys from admin (hero, certifications, testimonials, …).
 * Optional `order` controls homepage section positions.
 */
export class UpdateSectionVisibilityDto {
  @IsObject()
  sections!: Record<string, boolean>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  order?: string[];
}

/** Kept for documentation / optional typing in clients */
export class SectionVisibilityMap {
  @IsOptional() @IsBoolean() hero?: boolean;
  @IsOptional() @IsBoolean() about?: boolean;
  @IsOptional() @IsBoolean() services?: boolean;
  @IsOptional() @IsBoolean() stack?: boolean;
  @IsOptional() @IsBoolean() experience?: boolean;
  @IsOptional() @IsBoolean() certifications?: boolean;
  @IsOptional() @IsBoolean() projects?: boolean;
  @IsOptional() @IsBoolean() blog?: boolean;
  @IsOptional() @IsBoolean() contact?: boolean;
  @IsOptional() @IsBoolean() footer?: boolean;
  @IsOptional() @IsBoolean() testimonials?: boolean;
  @IsOptional() @IsBoolean() skills?: boolean;
  @IsOptional() @IsBoolean() pricing?: boolean;
}
