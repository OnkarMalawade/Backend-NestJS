import { Injectable } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { OrdersService } from '../orders/orders.service';
import { OrderDto } from '../orders/dto/order.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly cartService: CartService,
    private readonly ordersService: OrdersService,
  ) {}

  pay() {
    const cart = this.cartService.getCart();
    if (cart.length === 0) throw new Error('Cart is empty');

    const total = this.cartService.getCartTotal();

    const order: OrderDto = {
      id: Date.now(),
      items: cart,
      total,
      date: new Date(),
    };

    this.ordersService.addOrder(order);
    this.cartService.clearCart();

    return { message: 'Payment successful', order };
  }
}
