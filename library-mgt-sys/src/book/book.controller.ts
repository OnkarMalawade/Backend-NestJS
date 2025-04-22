import { Controller, Post, Get, Body, UsePipes, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ValidateQuantityPipe } from './pipes/validate-quantity.pipe';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UsePipes(new ValidateQuantityPipe())
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
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
  delete(@Param('title') id: string) {
    const bookExists = await this.bookService.getById(id);
    if (!bookExists) {
      throw new NotFoundException(`Book with Name ${id} not found`);
    }
    return this.bookService.delete(id);
  }
}
