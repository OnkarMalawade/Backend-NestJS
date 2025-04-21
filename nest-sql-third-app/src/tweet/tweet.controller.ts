import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { UpdateTweetDto } from '../dto/update-tweet.dto';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get()
  async findAll() {
    return this.tweetService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateTweetDto) {
    return this.tweetService.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTweetDto,
  ) {
    return this.tweetService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.remove(id);
  }
}
