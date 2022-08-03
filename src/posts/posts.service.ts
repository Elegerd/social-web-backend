import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Users } from 'src/users/users.entity';
import { ERROR_MESSAGE } from 'src/constants';
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
      const savedPost = await this.postsRepository.save({
        ...postDto,
        userId: user.id,
      });
      return this.postsRepository.findOneOrFail({
        where: {
          id: savedPost.id,
        },
        relations: ['user'],
      });
    } catch (e) {
      throw new UnprocessableEntityException({
        message: ERROR_MESSAGE,
        error: (e as Error).message,
      });
    }
  }
}
