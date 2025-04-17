// src/user/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }

  @Post()
  createUser(@Body() user: { id: number; name: string; email: string }) {
    return this.userService.create(user);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() update: { name?: string; email?: string },
  ) {
    return this.userService.updateUser(+id, update);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
