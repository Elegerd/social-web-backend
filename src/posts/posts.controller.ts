import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
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
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'deleteOneBase'],
  },
})
@Controller('posts')
export class PostsController implements CrudController<Posts> {
  constructor(public service: PostsService) {}

  @ApiBody({ type: PostDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createPost(@User() user: Users, @Body() body: PostDto) {
    return this.service.createPost(user, body);
  }
}
