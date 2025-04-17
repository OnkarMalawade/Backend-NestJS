import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  private orders: OrderDto[] = [];

  addOrder(order: OrderDto) {
    this.orders.push(order);
  }

  getOrders(): OrderDto[] {
    return this.orders;
  }
}
