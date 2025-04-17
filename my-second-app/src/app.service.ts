import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  greetUser(name: string): string {
    return `Hello, ${name}!`;
  }

  getTechStack(): string[] {
    return ['NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'];
  }
}
