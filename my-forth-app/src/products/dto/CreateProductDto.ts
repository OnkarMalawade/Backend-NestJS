import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  Min,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  name: string;

  @IsNumber()
  @Min(1, { message: 'Price must be at least 1.' })
  price: number;

  @IsOptional()
  @IsArray()
  @MinLength(2, {
    each: true,
    message: 'Each tag must be at least 2 characters.',
  })
  @IsString({ each: true })
  tags?: string[];
}
