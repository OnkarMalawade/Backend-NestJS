import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { Tweet } from './entities/tweet.entity';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  create(@Body() data: Partial<Tweet>) {
    return this.tweetService.create(data);
  }

  @Get()
  findAll() {
    return this.tweetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tweetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Tweet>) {
    return this.tweetService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tweetService.remove(+id);
  }
}
