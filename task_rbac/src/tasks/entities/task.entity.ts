import { BaseEntity } from '../../common/entities/base.entity';

export enum TaskStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
}

export class Task extends BaseEntity {
  title: string;
  description: string;
  status: TaskStatus;
  createdBy: number; // User ID
}
