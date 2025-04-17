import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ✂️ Strips properties not in the DTO
      forbidNonWhitelisted: true, // ❌ Throws error if unknown fields are sent
      transform: true, // 🔁 Auto-transform payloads to DTO instances
    }),
  );

  await app.listen(3000);
}
bootstrap();
