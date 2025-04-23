import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;
}
