import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RateLimitMiddleware } from './middlewares/rate-limit.middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new RateLimitMiddleware().use); // apply globally
  await app.listen(3000);
}
bootstrap();
