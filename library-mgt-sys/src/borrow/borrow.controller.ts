import { Controller, Post, Param, Body } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowDto } from './dto/borrow.dto';

@Controller()
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  borrow(@Body() dto: BorrowDto) {
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
