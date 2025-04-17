import { Module } from '@nestjs/common';
import { EmploymentController } from './employment.controller';
import {
  IsRateInCountryRange,
  ContractorDateCheck,
  ValidateMetadata,
} from './validators';
import { EmploymentService } from './employment.service';

@Module({
  controllers: [EmploymentController],
  providers: [IsRateInCountryRange, ContractorDateCheck, ValidateMetadata, EmploymentService],
})
export class EmploymentModule {}
