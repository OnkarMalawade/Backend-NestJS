import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, IsNull, LessThan } from 'typeorm';
import { Borrow } from './entities/borrow.entity';
import { Book } from '../book/entities/book.entity';
import { Member } from '../members/entities/member.entity';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private readonly borrowRepo: Repository<Borrow>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}
  async borrow(dto: CreateBorrowDto) {
    const book = await this.bookRepo.findOne({ where: { id: dto.bookId } });
    if (!book || book.quantity <= 0)
      throw new NotFoundException('Book not available');

    const member = await this.memberRepo.findOne({
      where: { id: dto.memberId },
    });
    if (!member) throw new NotFoundException('Member not found');

    const borrowRecord = this.borrowRepo.create({
      book,
      member,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days later
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
