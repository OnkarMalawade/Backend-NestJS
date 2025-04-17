import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string }) {
    const payload = { username: body.username, role: 'user' };
    const token = await this.authService.generateToken(payload);
    return { access_token: token };
  }
}
