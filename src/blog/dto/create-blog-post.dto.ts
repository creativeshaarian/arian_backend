import {
  IsArray,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(512)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  titleAccent?: string;

  @IsString()
  excerpt!: string;

  @IsString()
  @MaxLength(64)
  category!: string;

  @IsString()
  @MaxLength(128)
  categoryLabel!: string;

  @IsString()
  @MaxLength(128)
  author!: string;

  @IsString()
  @MaxLength(32)
  readingTime!: string;

  @IsString()
  @MaxLength(32)
  date!: string;

  @IsString()
  dateISO!: string;

  @IsString()
  image!: string;

  @IsOptional()
  @IsUUID()
  imageMediaId?: string;

  @IsString()
  @MaxLength(255)
  imageAlt!: string;

  @IsOptional()
  @IsObject()
  article?: Record<string, unknown>;

  @IsOptional()
  @IsIn(['published', 'draft'])
  status?: 'published' | 'draft';

  @IsOptional()
  @IsInt()
  sortOrder?: number;
}

export class UpdateBlogPostDto extends CreateBlogPostDto {}
