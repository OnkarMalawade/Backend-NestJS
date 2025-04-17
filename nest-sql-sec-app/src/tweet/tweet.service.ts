import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepo: Repository<Tweet>,
  ) {}

  create(data: Partial<Tweet>) {
    const tweet = this.tweetRepo.create(data);
    return this.tweetRepo.save(tweet);
  }

  findAll() {
    return this.tweetRepo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const tweet = await this.tweetRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!tweet) throw new NotFoundException(`Tweet with id ${id} not found`);
    return tweet;
  }

  async update(id: number, data: Partial<Tweet>) {
    await this.tweetRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const tweet = await this.findOne(id);
    return this.tweetRepo.remove(tweet);
  }
}
