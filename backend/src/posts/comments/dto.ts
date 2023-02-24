import { IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MaxLength(300)
  content: string;
}
