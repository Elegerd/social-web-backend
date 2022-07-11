import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { UsersDto } from './users.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<Users> {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    super(usersRepository);
  }

  async findAll(): Promise<Users[]> {
    try {
      return await this.usersRepository.find();
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async findOneById(id: number): Promise<Users> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: {
          id,
        },
      });

      return user;
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async findOneByEmail(email: string): Promise<Users> {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          email,
        },
      });

      return user;
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async create(entry: UsersDto): Promise<Users> {
    try {
      return await this.usersRepository.save({ ...entry, id: null });
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }
}
