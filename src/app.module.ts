import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { TYPEORM_CONFIG } from './constants';
import { jwtConstants } from './auth/constants';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationsModule } from './conversations/conversations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPEORM_CONFIG),
    {
      ...JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '30d' },
      }),
      global: true,
    },
    AuthModule,
    UsersModule,
    PostsModule,
    MessagesModule,
    ConversationsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
