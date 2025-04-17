import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [CartModule, PaymentModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
