import { CartItemDto } from '../../cart/dto/cart-item.dto';

export class OrderDto {
  id: number;
  items: CartItemDto[];
  total: number;
  date: Date;
}
