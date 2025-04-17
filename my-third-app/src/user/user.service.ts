import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [{ id: 1, name: 'Onkar', email: 'onkar@example.com' }];

  create(user: { id: number; name: string; email: string }) {
    this.users.push(user);
    return user;
  }

  findUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  findAll() {
    return this.users;
  }

  updateUser(id: number, updated: { name?: string; email?: string }) {
    const user = this.findUserById(id);
    if (user) {
      user.name = updated.name ?? user.name;
      user.email = updated.email ?? user.email;
    }
    return user;
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
    return null;
  }
}
