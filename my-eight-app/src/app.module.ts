import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ProfileController } from './profile/profile.controller';
@Module({
  imports: [],
  controllers: [AuthController, ProfileController],
  providers: [AuthService],
})
export class AppModule {}
