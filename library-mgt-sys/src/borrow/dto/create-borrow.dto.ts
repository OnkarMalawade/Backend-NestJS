import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBorrowDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsDateString()
  borrowDate: Date;

  @IsDateString()
  returnDate: Date;

  @IsDateString()
  dueDate: Date;
}
