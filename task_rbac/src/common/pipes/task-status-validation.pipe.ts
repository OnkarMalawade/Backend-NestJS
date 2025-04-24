import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../../tasks/entities/task.entity';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [TaskStatus.OPEN, TaskStatus.DONE];

  transform(value: any) {
    if (typeof value === 'string') {
      value = value.toUpperCase();

      if (!this.isStatusValid(value)) {
        throw new BadRequestException(
          `"${value}" is an invalid status. Status must be OPEN or DONE.`,
        );
      }

      return value;
    }

    if (value && value.status) {
      const status = value.status.toUpperCase();

      if (!this.isStatusValid(status)) {
        throw new BadRequestException(
          `"${status}" is an invalid status. Status must be OPEN or DONE.`,
        );
      }

      value.status = status;
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    return this.allowedStatuses.includes(status);
  }
}
