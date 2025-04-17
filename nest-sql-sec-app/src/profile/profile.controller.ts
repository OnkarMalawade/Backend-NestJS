import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() data: Partial<Profile>) {
    return this.profileService.create(data);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Profile>) {
    return this.profileService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
