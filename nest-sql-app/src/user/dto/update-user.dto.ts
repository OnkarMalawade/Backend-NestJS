// src/user/dto/update-user.dto.ts
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Enter a valid email' })
  email?: string;
}
