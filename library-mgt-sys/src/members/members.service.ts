import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  async createMem(createMemberDto: CreateMemberDto) {
    const existing = await this.memberRepo.findOne({
      where: { email: createMemberDto.email },
    });
    if (existing) {
      throw new BadRequestException('Member with this email already exists');
    }

    const member = this.memberRepo.create(createMemberDto);
    return this.memberRepo.save(member);
  }

  findAll() {
    return this.memberRepo.find({ relations: ['borrow'] });
  }

  async findOne(id: number) {
    const member = await this.memberRepo.findOne({
      where: { id },
      relations: ['borrow'],
    });
    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const member = await this.memberRepo.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }

    const updated = this.memberRepo.merge(member, updateMemberDto);
    return this.memberRepo.save(updated);
  }

  async remove(id: number) {
    const member = await this.memberRepo.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }

    return this.memberRepo.remove(member);
  }
}
