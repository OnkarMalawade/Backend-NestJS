import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(data: Partial<User>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find({ relations: ['profile', 'tweets'] });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['profile', 'tweets'],
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async update(id: number, data: Partial<User>) {
    await this.userRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }
}
