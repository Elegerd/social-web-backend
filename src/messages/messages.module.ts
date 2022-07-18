import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConversationsModule } from 'src/conversations/conversations.module';
import { MessagesController } from './messages.controller';
import { Messages } from './messages.entity';
import { MessagesService } from './messages.service';

@Module({
  imports: [ConversationsModule, TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
