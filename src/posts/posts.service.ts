import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Users } from 'src/users/users.entity';
import { Posts } from './posts.entity';
import { PostDto } from './posts.dto';

@Injectable()
export class PostsService extends TypeOrmCrudService<Posts> {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {
    super(postsRepository);
  }

  async createPost(user: Users, postDto: PostDto) {
    try {
      return this.postsRepository.save({
        ...postDto,
        userId: user.id,
      });
    } catch {
      throw new BadRequestException('Что-то пошло не так, попробуйте еще раз');
    }
  }
}
