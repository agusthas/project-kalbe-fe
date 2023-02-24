import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsNumber()
  categoryId: number;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
