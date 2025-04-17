import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { CartModule } from '../cart/cart.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [CartModule, OrdersModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
