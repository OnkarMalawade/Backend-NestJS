import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { Member } from './member.entity';

@Entity()
export class BorrowRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.borrow)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => Member, (member) => member.borrow)
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @Column()
  borrowDate: Date;

  @Column({ nullable: true })
  returnDate: Date;

  @Column()
  dueDate: Date;
}
