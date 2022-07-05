import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { instanceToPlain, Exclude } from 'class-transformer';

import { Posts } from 'src/posts/posts.entity';

@Entity()
export class Users {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 100 })
  firstName: string;

  @ApiProperty()
  @Column({ length: 100 })
  lastName: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  avatar?: string;

  @ApiProperty()
  @Index({ unique: true })
  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => Posts, (post) => post.user)
  posts?: Posts[];

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
