import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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

  // async findAll(query: QueryDto) {
  //   const take = parseInt(query.limit ?? '10');
  //   const skip = parseInt(query.page ?? '0') * take;
  //   const sortField = query.sortField || 'id';
  //   const sortOrder = query.sortOrder === 'DESC' ? 'DESC' : 'ASC';

  //   return this.userRepo.find({
  //     skip,
  //     take,
  //     order: { [sortField]: sortOrder },
  //     where: query.email ? { email: query.email } : {},
  //   });
  // }

  // async create(dto: CreateUserDto) {
  //   const existing = await this.userRepo.findOne({
  //     where: { email: dto.email },
  //   });

  //   if (existing) {
  //     throw new ConflictException('Email already exists');
  //   }

  //   const hashed = await bcrypt.hash(dto.password, 10);
  //   const user = this.userRepo.create({ ...dto, password: hashed });
  //   return this.userRepo.save(user);
  // }

  // async findOne(id: number) {
  //   const user = await this.userRepo.findOne({ where: { id } });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return user;
  // }

  // async update(id: number, dto: UpdateUserDto) {
  //   await this.findOne(id); // validate existence
  //   if (dto.password) {
  //     dto.password = await bcrypt.hash(dto.password, 10);
  //   }
  //   await this.userRepo.update(id, dto);
  //   return this.findOne(id);
  // }

  // async remove(id: number) {
  //   const user = await this.userRepo.findOne({ where: { id } });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   await this.userRepo.delete(id);
  //   return { message: `User with id ${id} has been deleted.` };
  // }

  async findAll(query: QueryDto) {
    const take = parseInt(query.limit ?? '10');
    const skip = parseInt(query.page ?? '0') * take;
    const sortField = query.sortField || 'id';
    const sortOrder = query.sortOrder === 'DESC' ? 'DESC' : 'ASC';

    const qb = this.userRepo
      .createQueryBuilder('user')
      .orderBy(`user.${sortField}`, sortOrder)
      .skip(skip)
      .take(take);

    if (query.email) {
      qb.andWhere('user.email = :email', { email: query.email });
    }

    return qb.getMany();
  }

  async create(dto: CreateUserDto) {
    const existing = await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email: dto.email })
      .getOne();

    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashed });
    return this.userRepo.save(user);
  }

  async findOne(id: number) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id); // Validate existence

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    await this.userRepo
      .createQueryBuilder()
      .update(User)
      .set(dto)
      .where('id = :id', { id })
      .execute();

    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepo
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();

    return { message: `User with id ${id} has been deleted.` };
  }
}
