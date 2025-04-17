import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/CreateProductDto';

@Injectable()
export class ProductsService {
  create(product: CreateProductDto) {
    // Create a new product
    return {
      message: 'Product created successfully',
      data: product,
    };
  }
}
