import {
  IsDateString,
  IsNotEmpty,
  IsInt,
  Validate,
  IsOptional,
} from 'class-validator';
import { IsFutureOrToday } from '../../common/pipes/is-future-or-today.pipes'; // Custom validator

export class CreateBorrowDto {
  @IsInt()
  bookId: number;

  @IsInt()
  memberId: number;

  @IsNotEmpty()
  @IsDateString()
  @Validate(IsFutureOrToday, { message: 'Borrow date cannot be in the past' })
  borrowDate: Date;

  @IsDateString()
  @IsOptional()
  returnDate: Date;

  @IsDateString()
  dueDate: Date;
}
