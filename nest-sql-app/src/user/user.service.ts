// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async update(id: number, updateData: UpdateUserDto) {
    await this.userRepo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return this.userRepo.remove(user);
  }
}
