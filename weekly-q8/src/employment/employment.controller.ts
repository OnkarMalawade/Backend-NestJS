import { Controller, Post, Body, Headers } from '@nestjs/common';
import { EmploymentDto } from './employment.dto';

@Controller('employment')
export class EmploymentController {
  @Post()
  create(
    @Body() dto: EmploymentDto,
    @Headers('x-country-code') countryCode: string,
  ) {
    // You can use countryCode in service if needed
    return { message: 'Validation passed!' };
  }
}
