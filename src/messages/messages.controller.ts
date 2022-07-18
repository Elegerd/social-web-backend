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
import { CreateMessagesDto } from './messages.dto';

import { Messages } from './messages.entity';
import { MessagesService } from './messages.service';

@Crud({
  model: {
    type: Messages,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'deleteOneBase'],
  },
  query: {
    join: {
      author: {
        eager: true,
      },
    },
  },
})
@ApiBearerAuth()
@ApiTags('Messages')
@UseGuards(AuthGuard('jwt'))
@Controller('messages')
export class MessagesController implements CrudController<Messages> {
  constructor(public service: MessagesService) {}

  @ApiBody({ type: CreateMessagesDto })
  @ApiResponse({ type: Messages, status: HttpStatus.CREATED })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createMessage(@User() user: Users, @Body() body: CreateMessagesDto) {
    return this.service.createMessage(user, body);
  }
}
