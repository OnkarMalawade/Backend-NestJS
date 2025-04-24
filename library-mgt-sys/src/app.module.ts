import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/entities/book.entity';
import { Member } from './members/entities/member.entity';
import { Borrow } from './borrow/entities/borrow.entity';

import { MembersModule } from './members/members.module';
import { BookModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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

    // Register the feature modules
    MembersModule,
    BookModule,
    BorrowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
