// user.dto.ts
import { IsEmail, IsString, Length, IsInt, Min, Max } from 'class-validator';

export class UserDto {
  @IsString()
  @Length(2, 50, { message: 'First name must be 2 to 50 characters long' })
  firstName: string;

  @IsString()
  @Length(2, 50, { message: 'Last name must be 2 to 50 characters long' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsInt({ message: 'Age must be an integer' })
  @Min(18, { message: 'Age must be at least 18' })
  @Max(65, { message: 'Age must not be more than 65' })
  age: number;
}
