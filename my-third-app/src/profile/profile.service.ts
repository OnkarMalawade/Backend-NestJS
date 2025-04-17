import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
  private profiles = [{ id: 101, userId: 1, bio: 'I love coding' }];

  constructor(private readonly userService: UserService) {}

  getAll() {
    return this.profiles;
  }

  findById(id: number) {
    return this.profiles.find((profile) => profile.id === id);
  }

  create(profile: { id: number; userId: number; bio: string }) {
    const user = this.userService.findUserById(profile.userId);
    if (!user) {
      throw new Error('User not found');
    }
    this.profiles.push(profile);
    return profile;
  }

  update(id: number, updated: { bio?: string }) {
    const profile = this.findById(id);
    if (profile) {
      profile.bio = updated.bio ?? profile.bio;
    }
    return profile;
  }

  delete(id: number) {
    const index = this.profiles.findIndex((profile) => profile.id === id);
    if (index !== -1) {
      return this.profiles.splice(index, 1)[0];
    }
    return null;
  }
}
