import { Injectable } from '@nestjs/common';
import { mockUsers } from './mock-data';
@Injectable()
export class UsersService {
  getUserByIdAndRole(id: number, role: string) {
    const users = mockUsers.find((u) => u.id === id);
    if (!users) return { message: 'User not found' };
    if (role === 'admin' && users.role === 'admin') {
      return {
        adminData: {
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          permissions: ['read', 'write', 'delete'],
        },
      };
    }
    if (role === 'user' && users.role === 'user') {
      return {
        userData: {
          id: users.id,
          name: users.name,
        },
      };
    }
    return { message: 'Role mismatch or unauthorized access' };
  }
}
