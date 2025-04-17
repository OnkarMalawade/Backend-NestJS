import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/UserDto';
import { TrimPipe } from 'src/pipes/trimPipe';
import { ToUpperCasePipe } from 'src/pipes/toUpperCase';
import { JsonParsePipe } from 'src/pipes/jsonParser';
import { UserAgent } from 'src/decorators/user-agent.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): UserDto {
    return this.usersService.findOne(id);
  }

  @Get()
  handleJsonQuery(@Query('payload', JsonParsePipe) payload: any) {
    return {
      message: 'Parsed JSON received successfully',
      parsed: payload,
    };
  }

  @Post()
  createUser(@Body('name', TrimPipe) name: string): UserDto {
    return this.usersService.create(name);
  }

  @Post('register')
  registerUser(
    @Body('name', ToUpperCasePipe) name: string,
    @Body('email') email?: string,
  ): UserDto {
    return this.usersService.register(name, email);
  }
}
@Controller('info')
export class InfoController {
  @Get()
  getUserAgent(@UserAgent() userAgent: string) {
    console.log(`📱 Client User-Agent: ${userAgent}`);
    return {
      message: 'User-Agent info logged successfully!',
      userAgent,
    };
  }
}
