import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, IsNull, LessThan } from 'typeorm';
import { BorrowRecord } from './entities/borrow-record.entity';
import { Book } from './entities/book.entity';
import { Member } from './entities/member.entity';
import { BorrowDto } from './dto/borrow.dto';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(BorrowRecord)
    private readonly borrowRepo: Repository<BorrowRecord>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  async borrow(dto: BorrowDto) {
    const book = await this.bookRepo.findOne({ where: { id: dto.bookId } });
    if (!book || book.quantity <= 0)
      throw new NotFoundException('Book not available');

    const member = await this.memberRepo.findOne({
      where: { id: dto.memberId },
    });

    const borrowRecord = this.borrowRepo.create({
      book,
      member,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });
    await this.borrowRepo.save(borrowRecord);

    book.quantity--;
    await this.bookRepo.save(book);

    return borrowRecord;
  }

  async returnBook(id: number) {
    const record = await this.borrowRepo.findOne({
      where: { id },
      relations: ['book'],
    });
    if (!record || record.returnDate)
      throw new BadRequestException('Already returned');

    record.returnDate = new Date();
    await this.borrowRepo.save(record);

    record.book.quantity++;
    await this.bookRepo.save(record.book);

    return record;
  }

  async getOverdueBooks() {
    const today = new Date();
    return this.borrowRepo.find({
      where: { dueDate: LessThan(today), returnDate: IsNull() },
      relations: ['book', 'member'],
    });
  }
}
