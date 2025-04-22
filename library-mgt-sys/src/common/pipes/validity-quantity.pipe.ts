import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateQuantityPipe implements PipeTransform {
  transform(value: number) {
    if (value < 0) throw new BadRequestException('Quantity must be >= 0');
    return value;
  }
}
