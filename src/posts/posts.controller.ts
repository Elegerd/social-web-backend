import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/users/users.entity';
import { PostDto } from './posts.dto';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';

@Crud({
  model: {
    type: Posts,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'deleteOneBase'],
  },
  query: {
    join: {
      user: {
        eager: true,
      },
    },
  },
})
@ApiBearerAuth()
@ApiTags('Posts')
@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController implements CrudController<Posts> {
  constructor(public service: PostsService) {}

  @ApiBody({ type: PostDto })
  @ApiResponse({ type: Posts, status: HttpStatus.CREATED })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createPost(@User() user: Users, @Body() body: PostDto) {
    return this.service.createPost(user, body);
  }
}
