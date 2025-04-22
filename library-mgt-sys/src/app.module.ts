import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Member } from './entities/member.entity';
import { Borrow } from './entities/borrow-record.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'library_db',
      entities: [Book, Member, Borrow],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Book, Member, BorrowRecord]),
  ],
})
export class AppModule {}
