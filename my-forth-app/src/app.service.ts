import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getStatus(isActive: boolean) {
    return {
      message: 'Status check complete.',
      isActive: isActive,
      status: isActive ? 'Active' : 'Inactive',
    };
  }
}
