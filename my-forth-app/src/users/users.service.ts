import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/UserDto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    { id: 1, name: 'Onkar Malawade', email: 'onkar@example.com' },
    { id: 2, name: 'Padurang DDS', email: 'bdds@example.com' },
    { id: 3, name: 'Bhushan DDS', email: 'dd@example.com' },
  ];

  findOne(id: number): UserDto {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  create(name: string): UserDto {
    const newUser: UserDto = {
      id: this.users.length + 1,
      name,
      email: `${name.replace(/\s+/g, '').toLowerCase()}@gm.com`,
    };
    this.users.push(newUser);
    return newUser;
  }

  register(name: string, email?: string): UserDto {
    const newUser: UserDto = {
      id: this.users.length + 1,
      name,
      email: email ?? `${name.toLowerCase()}@example.com`,
    };
    this.users.push(newUser);
    return newUser;
  }
}
