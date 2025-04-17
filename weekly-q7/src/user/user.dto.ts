import {
  IsUUID,
  IsString,
  Length,
  IsIn,
  IsInt,
  Min,
  Max,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsPostalCodeByCountry } from './postal-code.validator';

const currentYear = new Date().getFullYear();

class AddressDto {
  @IsString()
  @Length(5, 100)
  street: string;

  @IsString()
  @IsPostalCodeByCountry({ message: 'INVALID_POSTAL_CODE' })
  postalCode: string;

  @IsIn(['US', 'UK', 'IN'])
  country: string;
}

class EducationDto {
  @IsIn(['BSc', 'MSc', 'PhD'])
  degree: string;

  @IsInt()
  @Min(1990)
  @Max(currentYear)
  year: number;
}

export class UserDto {
  @IsUUID()
  id: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];
}
