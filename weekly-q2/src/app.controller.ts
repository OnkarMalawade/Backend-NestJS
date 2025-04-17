import { Controller, Get, UseInterceptors, Param } from '@nestjs/common';
import { Timeout } from './timeout.decorator';
import { TimeoutInterceptor } from './timeout.interceptor';
import { IsEvenPipe } from './pipes/is-even.pipes';
@Controller()
@UseInterceptors(TimeoutInterceptor)
export class AppController {
  const
  @Get('slow')
  @Timeout(2000) // Cancel if longer than 2 seconds
  async slowMethod(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // simulates slow work
    return 'Completed after delay';
  }
  @Get('fast')
  @Timeout(2000)
  async fastMethod(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // finishes fast
    return 'Quick response';
  }
  @Get('check-even/:num')
  checkEven(@Param('num', new IsEvenPipe()) num: number) {
    return `${num} is even! ✅`;
  }
  @Get()
  getData(){
    return this..
  }
}
