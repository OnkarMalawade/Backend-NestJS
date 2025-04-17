import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getData() {
    return {
      message: 'Sample data',
      id: 123,
      price: 49.99,
      active: true,
      nested: {
        count: 7,
        rating: 4.5,
      },
      list: [10, 20, { item: 30 }],
    };
  }
}
