// src/pipes/json-parse.pipe.ts

import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class JsonParsePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): any {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new BadRequestException('Invalid JSON string in query parameter');
    }
  }
}
