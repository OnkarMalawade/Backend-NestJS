import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SimpleLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString();

    console.log(`[${time}] ${method} ${url} - Intercepted`);

    return next
      .handle()
      .pipe(tap(() => console.log(`✅ Response sent for ${method} ${url}`)));
  }
}
