import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^[6-9]\d{9}$/, { message: 'Invalid Indian phone number' })
  phone: string; // ✅ Change from number to string
}
