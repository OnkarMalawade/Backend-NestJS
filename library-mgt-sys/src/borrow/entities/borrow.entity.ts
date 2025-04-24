import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import { Member } from '../../members/entities/member.entity';

@Entity()
export class Borrow {
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
