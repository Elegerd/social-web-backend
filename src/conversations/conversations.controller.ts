import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/users/users.entity';
import { CreateConversationsDto } from './conversations.dto';
import { Conversations } from './conversations.entity';
import { ConversationsService } from './conversations.service';

@Crud({
  model: {
    type: Conversations,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
  query: {
    join: {
      participants: {
        eager: true,
      },
      lastMessage: {
        eager: true,
      },
    },
  },
})
@ApiBearerAuth()
@ApiTags('Conversations')
@UseGuards(AuthGuard('jwt'))
@Controller('conversations')
export class ConversationsController implements CrudController<Conversations> {
  constructor(public service: ConversationsService) {}

  @ApiBody({ type: CreateConversationsDto })
  @ApiResponse({ type: Conversations, status: HttpStatus.CREATED })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createConversation(
    @User() user: Users,
    @Body() body: CreateConversationsDto,
  ) {
    return this.service.createConversation(user, body);
  }
}