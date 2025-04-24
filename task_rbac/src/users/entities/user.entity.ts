import { BaseEntity } from '../../common/entities/base.entity';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class User extends BaseEntity {
  username: string;
  password: string;
  role: UserRole;
}
