import { IsIn } from 'class-validator';

export class ResetContentDto {
  @IsIn(['reset'])
  action!: 'reset';
}
