import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ToUpperCasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): string {
    if (typeof value !== 'string') {
      throw new BadRequestException(
        'ToUpperCasePipe can only be applied to strings',
      );
    }
    return value.toUpperCase();
  }
}
