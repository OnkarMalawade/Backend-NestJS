import { Controller, Get, Query, ParseBoolPipe } from '@nestjs/common';
import { TrimPipe } from './pipes/trimPipe';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  getStatus(@Query('isActive', ParseBoolPipe) isActive: boolean) {
    return this.appService.getStatus(isActive);
  }

  @Get('greet')
  greet(@Query('name', TrimPipe) name: string) {
    return {
      message: `Hello, ${name}!`,
    };
  }
}
