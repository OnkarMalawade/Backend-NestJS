import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  create(data: Partial<Profile>) {
    const profile = this.profileRepo.create(data);
    return this.profileRepo.save(profile);
  }

  findAll() {
    return this.profileRepo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const profile = await this.profileRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!profile)
      throw new NotFoundException(`Profile with id ${id} not found`);
    return profile;
  }

  async update(id: number, data: Partial<Profile>) {
    await this.profileRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const profile = await this.findOne(id);
    return this.profileRepo.remove(profile);
  }
}
