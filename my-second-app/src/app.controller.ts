import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('greet/:uname')
  greetUser(@Param('uname') name: string): string {
    // return `Hello, ${name}!`;
    return this.appService.greetUser(name);
  }

  @Get('tech-stack')
  getTechStack(): string[] {
    return this.appService.getTechStack();
  }
}
