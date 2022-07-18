import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ERROR_MESSAGE } from 'src/constants';
import { UpdateUserDto, UsersDto } from './users.dto';
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
      return this.usersRepository.find();
    } catch (e) {
      throw new UnprocessableEntityException({
        message: ERROR_MESSAGE,
        error: (e as Error).message,
      });
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
    } catch (e) {
      throw new UnprocessableEntityException({
        message: ERROR_MESSAGE,
        error: (e as Error).message,
      });
    }
  }

  async findOneByEmail(email: string): Promise<Users> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: {
          email,
        },
      });

      return user;
    } catch (e) {
      throw new UnprocessableEntityException({
        message: ERROR_MESSAGE,
        error: (e as Error).message,
      });
    }
  }

  async create(entry: UsersDto): Promise<Users> {
    try {
      return this.usersRepository.save({ ...entry, id: null });
    } catch (e) {
      throw new UnprocessableEntityException({
        message: ERROR_MESSAGE,
        error: (e as Error).message,
      });
    }
  }

  async update(id: Users['id'], updateUserDto: UpdateUserDto): Promise<Users> {
    try {
      await this.usersRepository.update(id, { ...updateUserDto });
      return this.findOneById(id);
    } catch (e) {
      throw new UnprocessableEntityException({
        message: ERROR_MESSAGE,
        error: (e as Error).message,
      });
    }
  }
}
