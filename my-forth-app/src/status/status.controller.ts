import { Controller, Get } from '@nestjs/common';
import { UserAgent } from 'src/decorators/user-agent.decorator';

@Controller('status')
export class StatusController {
  @Get()
  getStatus(@UserAgent() userAgent: string) {
    console.log('User-Agent:', userAgent);
    return {
      status: 'OK',
      client: userAgent,
    };
  }
}
