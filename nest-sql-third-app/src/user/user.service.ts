import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { QueryDto } from '../dto/query.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findAll(query: QueryDto) {
    const take = parseInt(query.limit ?? '10'); // default 10
    const skip = parseInt(query.page ?? '0') * take; // default page 0
    const sortField = query.sortField || 'id';
    const sortOrder = query.sortOrder === 'DESC' ? 'DESC' : 'ASC';

    return this.userRepo.find({
      skip,
      take,
      order: { [sortField]: sortOrder },
      where: query.email ? { email: query.email } : {},
    });
  }

  async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashed });
    return this.userRepo.save(user);
  }

  async findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateUserDto) {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    await this.userRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.userRepo.delete(id);
  }
}
