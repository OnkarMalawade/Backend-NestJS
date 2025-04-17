import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly secret = 'secretKey123';

  async generateToken(payload: any): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }
}
