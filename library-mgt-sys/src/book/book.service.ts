import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  create(dto: CreateBookDto) {
    const book = this.bookRepo.create(dto);
    return this.bookRepo.save(book);
  }

  getAvailable() {
    return this.bookRepo.find({ where: { quantity: MoreThan(0) } });
  }

  async getById(title: string) {
    const book = await this.bookRepo.findOne({ where: { title: title } });
    if (!book) {
      throw new NotFoundException(`Book with id ${title} not found`);
    }
    return book;
  }

  async updateQuantity(title: string, quantity: number) {
    const book = await this.bookRepo.findOne({ where: { title: title } });
    if (!book) {
      throw new NotFoundException(`Book with title ${title} not found`);
    }
    book.quantity += quantity;
    return this.bookRepo.save(book);
  }
  async deleteById(title: string) {
    const result = await this.bookRepo.delete({ title: title });
    if (result.affected === 0) {
      throw new NotFoundException(`Book with title ${title} not found`);
    }
    return { deleted: true };
  }

  async getAll() {
    const result = await this.bookRepo.find();
    return result;
  }
}
