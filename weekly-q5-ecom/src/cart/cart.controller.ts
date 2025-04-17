import { Controller, Get, Post, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartItemDto } from './dto/cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(): CartItemDto[] {
    return this.cartService.getCart();
  }

  @Post()
  addToCart(@Body() body: AddToCartDto): CartItemDto[] {
    return this.cartService.addToCart(body.productId, body.quantity);
  }
}
