import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'testdb',
      autoLoadEntities: true,
      synchronize: true, // Only for development
    }),
    UserModule,
  ],
  controllers: [AppController],
  // srvice, injectable, dependncy injection
})
export class AppModule {}
