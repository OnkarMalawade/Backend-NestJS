import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { SimpleLoggerInterceptor } from './interceptors/simple-logger.interceptor';

@UseInterceptors(SimpleLoggerInterceptor) // Applies to whole controller
@Controller('controller-sample')
export class AppController {
  @Get('route1')
  getRoute1() {
    return { message: 'This is route 1 - intercepted from controller level' };
  }

  @Get('route2')
  getRoute2() {
    return { message: 'This is route 2 - also intercepted' };
  }

  // Route-specific interceptor
  @Get('/independent')
  @UseInterceptors(SimpleLoggerInterceptor)
  getIndependentRoute() {
    return {
      message: 'Independent route - interceptor applied to this route only',
    };
  }
}
