import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, from, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { TIMEOUT_KEY } from './timeout.decorator';
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const delay = this.reflector.get<number>(TIMEOUT_KEY, context.getHandler());
    if (!delay) return next.handle(); // No timeout? Just proceed
    return next.handle().pipe(
      timeout(delay),
      catchError((err) =>
        err instanceof TimeoutError
          ? throwError(
              () =>
                new RequestTimeoutException(
                  `Request took longer than ${delay}ms`,
                ),
            )
          : throwError(() => err),
      ),
    );
  }
}
