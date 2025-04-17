import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserModule } from '../user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserModule],
  providers: [ProfileService, UserService],
  controllers: [ProfileController],
})
export class ProfileModule {}
