import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
