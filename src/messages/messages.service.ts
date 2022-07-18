import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Users } from 'src/users/users.entity';
import { ConversationsService } from 'src/conversations/conversations.service';
import { ERROR_MESSAGE } from 'src/constants';
import { Messages } from './messages.entity';
import { CreateMessagesDto } from './messages.dto';

@Injectable()
export class MessagesService extends TypeOrmCrudService<Messages> {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
    private readonly conversationsService: ConversationsService,
  ) {
    super(messagesRepository);
  }

  async createMessage(user: Users, createMessagesDto: CreateMessagesDto) {
    try {
      const message = await this.messagesRepository.save({
        id: null,
        authorId: user.id,
        ...createMessagesDto,
      });
      await this.conversationsService.updateLastMessage(
        message.conversationId,
        message,
      );
      return message;
    } catch (e) {
      throw new UnprocessableEntityException({
        message: ERROR_MESSAGE,
        error: (e as Error).message,
      });
    }
  }
}
