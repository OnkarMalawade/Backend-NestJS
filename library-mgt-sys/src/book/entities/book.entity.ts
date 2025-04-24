import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from '../../borrow/entities/borrow.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  quantity: number;

  @OneToMany(() => Borrow, (record) => record.book)
  borrow: Borrow[];
}
