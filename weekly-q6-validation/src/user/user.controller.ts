// user.controller.ts
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UserController {
  @Post()
  async createUser(@Body() body: any) {
    const userDto = plainToInstance(UserDto, body);
    const errors = await validate(userDto);

    if (errors.length > 0) {
      const formattedErrors = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();

      throw new BadRequestException({
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }
    return { message: 'User created successfully', data: userDto };
  }
}
