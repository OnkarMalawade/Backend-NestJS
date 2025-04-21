import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty()
  content: string;

  @IsNumber()
  userId: number;
}
