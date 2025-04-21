import { IsOptional, IsString } from 'class-validator';

export class UpdateTweetDto {
  @IsOptional()
  @IsString()
  content?: string;
}
