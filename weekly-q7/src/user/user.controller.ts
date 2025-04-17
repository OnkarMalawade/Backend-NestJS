import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  @Post()
  create(@Body() userDto: UserDto) {
    // Simulate success
    return {
      message: 'Validation passed ✅',
      data: userDto,
    };
  }
}
