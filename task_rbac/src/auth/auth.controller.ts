import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicAuthGuard } from './basic-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(BasicAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return {
      user: req.user,
      message: 'Login successful',
    };
  }
}
