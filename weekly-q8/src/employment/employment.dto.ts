import {
  IsEnum,
  ValidateNested,
  IsOptional,
  IsArray,
  ArrayMinSize,
  IsDate,
  IsNumber,
  IsObject,
  IsString,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  IsFutureDate,
  IsRateInCountryRange,
  ValidateMetadata,
  ContractorDateCheck,
} from './validators';

export enum EmploymentType {
  FULL_TIME = 'full-time',
  CONTRACTOR = 'contractor',
}

class FullTimeDetails {
  @IsArray()
  @ArrayMinSize(1, { message: 'BENEFITS_REQUIRED' })
  @IsString({ each: true })
  benefits: string[];

  @IsDate()
  @Validate(IsFutureDate, { message: 'JOINING_DATE_NOT_FUTURE' })
  @Type(() => Date)
  joiningDate: Date;
}

class ContractorDetails {
  @IsDate()
  @Type(() => Date)
  contractStart: Date;

  @IsDate()
  @Validate(ContractorDateCheck)
  @Type(() => Date)
  contractEnd: Date;

  @IsNumber()
  @Validate(IsRateInCountryRange)
  hourlyRate: number;
}

export class EmploymentDto {
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @IsOptional()
  @ValidateNested()
  @Type(() => FullTimeDetails)
  fullTimeDetails?: FullTimeDetails;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContractorDetails)
  contractorDetails?: ContractorDetails;

  @IsObject()
  @Validate(ValidateMetadata, { message: 'INVALID_METADATA' })
  metadata: Record<string, string>;
}
