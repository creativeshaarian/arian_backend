import {
  IsArray,
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProjectBlockDto {
  @IsString()
  @IsIn(['p', 'h2', 'h3', 'ul', 'ol', 'blockquote', 'image', 'code', 'divider'])
  type!: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  items?: string[];

  @IsOptional()
  @IsString()
  src?: string;

  @IsOptional()
  @IsString()
  alt?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  caption?: string;
}

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @IsString()
  @MaxLength(128)
  category!: string;

  @IsString()
  @MaxLength(128)
  client!: string;

  @IsString()
  @MaxLength(64)
  duration!: string;

  @IsOptional()
  @IsString()
  image!: string;

  @IsOptional()
  @IsUUID()
  coverMediaId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  @IsOptional()
  @IsString()
  heroBackground?: string;

  @IsOptional()
  @IsIn(['full', 'container'])
  heroLayout?: 'full' | 'container';

  @IsString()
  previewHref!: string;

  @IsString()
  ctaHref!: string;

  @IsString()
  @MaxLength(64)
  ctaLabel!: string;

  @IsString()
  summary!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectBlockDto)
  content?: ProjectBlockDto[];

  @IsOptional()
  @IsString()
  githubUrl?: string;

  @IsOptional()
  @IsString()
  liveUrl?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @IsOptional()
  @IsIn(['published', 'draft'])
  status?: 'published' | 'draft';

  @IsOptional()
  sortOrder?: number;
}

export class UpdateProjectDto extends CreateProjectDto {}
