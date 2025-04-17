import { Injectable } from '@nestjs/common';
import { InsufficientStockException } from '../common/exceptions/insufficient-stock.exception';
import { CartItemDto } from './dto/cart-item.dto';

@Injectable()
export class CartService {
  private products = [
    { id: 1, name: 'Laptop', price: 50000, stock: 10 },
    { id: 2, name: 'Mouse', price: 1000, stock: 20 },
  ];

  private cart: CartItemDto[] = [];

  getCart(): CartItemDto[] {
    return this.cart;
  }

  addToCart(productId: number, quantity: number): CartItemDto[] {
    const product = this.products.find((p) => p.id === productId);
    if (!product) throw new Error('Product not found');
    if (product.stock < quantity) {
      throw new InsufficientStockException('Not enough stock available');
    }

    product.stock -= quantity;

    const cartItem: CartItemDto = {
      ...product,
      quantity,
    };

    this.cart.push(cartItem);
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }

  getCartTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
