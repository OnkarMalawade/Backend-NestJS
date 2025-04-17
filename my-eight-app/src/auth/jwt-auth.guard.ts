import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly secret = 'secretKey123';

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Token not found');

    try {
      const decoded = await this.verifyToken(token);
      req['user'] = decoded;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });
  }
}
