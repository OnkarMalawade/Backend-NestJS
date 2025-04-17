import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const messages = (exceptionResponse as any).message;

    const errors = this.formatErrors(messages);
    res.status(status).json({ errors });
  }

  private formatErrors(messages: any[]) {
    const errorTree = {};
    for (const msg of messages) {
      try {
        const parsed = JSON.parse(msg);
        if (parsed.code) {
          this.set(errorTree, parsed.field, {
            code: parsed.code,
            ...parsed,
          });
        }
      } catch {
        const [field] = msg.split(' ');
        this.set(errorTree, field, { code: msg });
      }
    }
    return errorTree;
  }

  private set(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    while (keys.length > 1) {
      const key = keys.shift();
      current[key] = current[key] || {};
      current = current[key];
    }
    current[keys[0]] = value;
  }
}
