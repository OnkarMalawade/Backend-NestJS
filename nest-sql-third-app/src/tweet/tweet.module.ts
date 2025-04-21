import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, User])],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
