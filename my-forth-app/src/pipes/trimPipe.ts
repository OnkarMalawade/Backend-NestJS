import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (typeof value !== 'string') {
      throw new BadRequestException('TrimPipe can only be used with strings');
    }

    return value.trim();
  }
}
