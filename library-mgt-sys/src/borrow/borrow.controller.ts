import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Controller()
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  borrow(@Body() dto: CreateBorrowDto) {
    return this.borrowService.borrow(dto);
  }

  @Post('return/:id')
  return(@Param('id') id: number) {
    return this.borrowService.returnBook(id);
  }

  @Get('reports/overdue')
  getOverdue() {
    return this.borrowService.getOverdueBooks();
  }
}
