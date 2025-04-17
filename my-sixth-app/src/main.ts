import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformNumbersInterceptor } from './transform-numbers.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply interceptor globally
  app.useGlobalInterceptors(new TransformNumbersInterceptor());

  await app.listen(3000);
  console.log(`App running on http://localhost:3000`);
}
bootstrap();
