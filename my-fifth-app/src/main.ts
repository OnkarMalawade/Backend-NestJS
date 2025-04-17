import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply LoggingInterceptor globally
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(3000);
  console.log(`App is running on http://localhost:3000`);
}
bootstrap();
