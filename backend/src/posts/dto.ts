import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  image?: string;

  @Type(() => Number)
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
  image?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number;
}
