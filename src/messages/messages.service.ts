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
      const savedMessage = await this.messagesRepository.save({
        id: null,
        authorId: user.id,
        ...createMessagesDto,
      });
      const message = await this.messagesRepository.findOneOrFail({
        where: {
          id: savedMessage.id,
        },
        relations: ['author'],
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

  async setLastMessage(conversationId: number) {
    try {
      const conversation = await this.conversationsService.findOne({
        where: {
          id: conversationId,
        },
        relations: ['lastMessage'],
      });
      if (!!conversation && !conversation.lastMessage) {
        const messages = await this.messagesRepository.find({
          where: {
            conversationId,
          },
          order: {
            createdAt: 'DESC',
          },
        });
        if (messages.length) {
          await this.conversationsService.updateLastMessage(
            conversationId,
            messages[0],
          );
        }
      }
      return;
    } catch (e) {
      throw new UnprocessableEntityException({
        message: ERROR_MESSAGE,
        error: (e as Error).message,
      });
    }
  }
}
