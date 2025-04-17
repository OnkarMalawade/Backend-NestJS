import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmploymentModule } from './employment/employment.module';

@Module({
  imports: [EmploymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
