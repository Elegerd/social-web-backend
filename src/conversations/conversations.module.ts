import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';
import { ConversationsController } from './conversations.controller';
import { Conversations } from './conversations.entity';
import { ConversationsService } from './conversations.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Conversations])],
  providers: [ConversationsService],
  controllers: [ConversationsController],
  exports: [ConversationsService],
})
export class ConversationsModule {}
