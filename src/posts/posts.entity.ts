import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { instanceToPlain } from 'class-transformer';

import { Users } from 'src/users/users.entity';

@Entity()
export class Posts {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;

  @ApiProperty()
  @Column('uuid')
  userId: Users['id'];

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
