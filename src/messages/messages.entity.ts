import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { instanceToPlain } from 'class-transformer';

import { Users } from 'src/users/users.entity';
import { Conversations } from 'src/conversations/conversations.entity';

@Entity()
export class Messages {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Users, (user) => user.sentMessages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: Users;

  @ApiProperty()
  @Column({ type: 'number' })
  authorId: Users['id'];

  @ManyToOne(() => Conversations, (conversation) => conversation.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversations;

  @ApiProperty()
  @Column({ type: 'number' })
  conversationId: Conversations['id'];

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
