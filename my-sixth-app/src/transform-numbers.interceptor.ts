import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformNumbersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.transform(data)));
  }

  private transform(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.transform(item));
    }

    if (data !== null && typeof data === 'object') {
      const transformed = {};
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          transformed[key] = this.transform(data[key]);
        }
      }
      return transformed;
    }

    if (typeof data === 'number') {
      return data.toString();
    }

    return data;
  }
}
