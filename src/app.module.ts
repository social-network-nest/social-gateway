import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { ChatController } from './chat/chat.controller';
import { FeedController } from './feed/feed.controller';
import { SearchController } from './search/search.controller';
import { PostService } from './post/post.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwt_secret',
      signOptions: { expiresIn: '24h' },
    }),
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4001,
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4002,
        },
      },
      {
        name: 'CHAT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4004,
        },
      },
      {
        name: 'FEED_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4005,
        },
      },
      {
        name: 'SEARCH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4006,
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [
    PostController,
    AuthController,
    ChatController,
    FeedController,
    SearchController,
  ],
  providers: [PostService],
})
export class AppModule {}
