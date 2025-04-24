import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  Delete,
  Param,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ValidateQuantityPipe } from '../common/pipes/validate-quantity.pipe';
import { NotFoundException } from '@nestjs/common';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UsePipes(new ValidateQuantityPipe())
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get()
  getAllBooks() {
    return this.bookService.getAll();
  }

  @Get('available')
  getAvailable() {
    return this.bookService.getAvailable();
  }

  @Get(':title')
  getById(@Param('title') name: string) {
    return this.bookService.getById(name);
  }

  @Delete(':title')
  async delete(@Param('title') id: string) {
    const bookExists = await this.bookService.getById(id);
    if (!bookExists) {
      throw new NotFoundException(`Book with Name ${id} not found`);
    }
    return this.bookService.deleteById(id);
  }
}
