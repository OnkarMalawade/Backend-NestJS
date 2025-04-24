import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { Borrow } from './entities/borrow.entity';
import { Book } from '../book/entities/book.entity';
import { Member } from '../members/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow, Book, Member])],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
