import { IsIn, IsNotEmpty } from 'class-validator';
import { CONTENT_SECTIONS, ContentSectionKey } from '../content.types';

export class UpdateContentDto {
  @IsIn(CONTENT_SECTIONS)
  section!: ContentSectionKey;

  @IsNotEmpty()
  data!: unknown;
}
