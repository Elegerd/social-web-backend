import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Messages } from 'src/messages/messages.entity';
import { ERROR_MESSAGE } from 'src/constants';
import { Conversations } from './conversations.entity';
import { CreateConversationsDto } from './conversations.dto';

@Injectable()
export class ConversationsService extends TypeOrmCrudService<Conversations> {
  constructor(
    @InjectRepository(Conversations)
    private readonly conversationsRepository: Repository<Conversations>,
    private readonly usersService: UsersService,
  ) {
    super(conversationsRepository);
  }

  async updateLastMessage(
    conversationId: Conversations['id'],
    message: Messages,
  ) {
    try {
      return this.conversationsRepository.update(conversationId, {
        lastMessage: message,
      });
    } catch (e) {
      throw new UnprocessableEntityException({
        message: ERROR_MESSAGE,
        error: (e as Error).message,
      });
    }
  }

  async createConversation(
    user: Users,
    createConversationsDto: CreateConversationsDto,
  ) {
    try {
      const participantIds = [
        user.id,
        ...createConversationsDto.participantIds,
      ];
      const participants = await this.usersService.find({
        where: participantIds.map((id) => ({
          id,
        })),
      });
      const savedConversation = await this.conversationsRepository.save({
        id: null,
        participants,
      });
      return this.conversationsRepository.findOneOrFail({
        where: {
          id: savedConversation.id,
        },
        relations: ['participants', 'lastMessage'],
      });
    } catch (e) {
      throw new UnprocessableEntityException({
        message: ERROR_MESSAGE,
        error: (e as Error).message,
      });
    }
  }

  async getConversations(user: Users) {
    try {
      const conversations = await this.conversationsRepository.find({
        relations: ['participants', 'lastMessage'],
      });
      return conversations.filter((conversation) => {
        const participantIds = conversation.participants.map((p) => p.id);
        return participantIds.includes(user.id);
      });
    } catch (e) {
      throw new UnprocessableEntityException({
        message: ERROR_MESSAGE,
        error: (e as Error).message,
      });
    }
  }
}
