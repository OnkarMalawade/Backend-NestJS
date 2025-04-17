import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const errors =
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse &&
      Array.isArray(exceptionResponse.message)
        ? this.formatErrors(exceptionResponse.message)
        : [{ field: 'unknown', code: 'UNKNOWN_ERROR' }];

    response.status(status).json({ statusCode: status, errors });
  }

  private formatErrors(messages: string[]) {
    return messages.map((msg) => {
      const match = msg.match(/(.*?)\s/);
      const field = match ? match[1] : 'unknown';
      return {
        field,
        code: this.extractConstraintCode(msg),
      };
    });
  }

  private extractConstraintCode(msg: string): string {
    if (msg.toLowerCase().includes('uuid')) return 'ISUUID';
    if (msg.toLowerCase().includes('postal')) return 'ISPOSTALCODEBYCOUNTRY';
    if (msg.toLowerCase().includes('length')) return 'LENGTH';
    if (msg.toLowerCase().includes('in')) return 'ISIN';
    if (msg.toLowerCase().includes('greater')) return 'MIN';
    if (msg.toLowerCase().includes('less')) return 'MAX';
    return 'VALIDATION_ERROR';
  }
}
