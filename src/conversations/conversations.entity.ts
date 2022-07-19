import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Messages } from 'src/messages/messages.entity';
import { CONVERSATION_STATUES } from './conversations.constants';
import { Users } from 'src/users/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Conversations {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ enum: CONVERSATION_STATUES, default: CONVERSATION_STATUES.ACTIVE })
  status: CONVERSATION_STATUES;

  @ManyToMany(() => Users, { cascade: true })
  @JoinTable({
    name: 'conversation_use_participant',
    joinColumn: { name: 'conversationId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  participants?: Users[];

  @OneToMany(() => Messages, (message) => message.conversation, {
    cascade: true,
  })
  messages: Messages[];

  @OneToOne(() => Messages, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  lastMessage: Messages;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
