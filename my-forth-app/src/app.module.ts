import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './middleware/auth.middleware';

import { LoggerMiddleware } from './admin/middleware/request-logger.middleware';
import { StatusModule } from './status/status.module';

@Module({
  imports: [ProductsModule, UsersModule, StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'admin', method: RequestMethod.ALL });

    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'admin/secure', method: RequestMethod.ALL });
  }
}
