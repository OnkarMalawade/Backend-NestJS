import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    const expectedToken = 'Bearer my-secret-token'; // You can replace this with env or config

    if (!authHeader || authHeader !== expectedToken) {
      throw new UnauthorizedException(
        'Invalid or missing Authorization header',
      );
    }

    next();
  }
}
