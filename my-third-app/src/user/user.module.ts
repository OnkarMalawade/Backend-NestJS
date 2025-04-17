import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller'; // <-- import
import { ProfileService } from 'src/profile/profile.service';

@Module({
  providers: [UserService, ProfileService],
  // exports: [],
  controllers: [UserController], // <-- add this
})
export class UserModule {}
