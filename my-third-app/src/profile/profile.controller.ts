// src/profile/profile.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getAllProfiles() {
    return this.profileService.getAll();
  }

  @Get(':id')
  getProfileById(@Param('id') id: string) {
    return this.profileService.findById(+id);
  }

  @Post()
  createProfile(@Body() profile: { id: number; userId: number; bio: string }) {
    return this.profileService.create(profile);
  }

  @Put(':id')
  updateProfile(@Param('id') id: string, @Body() update: { bio?: string }) {
    return this.profileService.update(+id, update);
  }

  @Delete(':id')
  deleteProfile(@Param('id') id: string) {
    return this.profileService.delete(+id);
  }
}
