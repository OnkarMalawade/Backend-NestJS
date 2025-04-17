import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
@Injectable()
export class IsEvenPipe implements PipeTransform {
  transform(value: any) {
    const num = Number(value);
    if (isNaN(num)) {
      throw new BadRequestException('Input must be a number');
    }
    if (num % 2 !== 0) {
      throw new BadRequestException(`${num} is not an even number`);
    }
    return num; // pass validated number to controller
  }
}
