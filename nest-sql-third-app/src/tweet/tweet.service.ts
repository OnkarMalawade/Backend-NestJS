import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { UpdateTweetDto } from '../dto/update-tweet.dto';
import { User } from '../user/user.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepo: Repository<Tweet>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<Tweet[]> {
    return this.tweetRepo.find({ relations: ['user'] });
  }

  async create(dto: CreateTweetDto): Promise<Tweet> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');
    const tweet = this.tweetRepo.create({ content: dto.content, user });
    return this.tweetRepo.save(tweet);
  }

  async findOne(id: number): Promise<Tweet> {
    const tweet = await this.tweetRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!tweet) throw new NotFoundException('Tweet not found');
    return tweet;
  }

  async update(id: number, dto: UpdateTweetDto): Promise<Tweet> {
    const tweet = await this.findOne(id);
    tweet.content = dto.content ?? tweet.content;
    return this.tweetRepo.save(tweet);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tweetRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Tweet not found');
  }
}
