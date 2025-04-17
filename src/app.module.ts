import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { ChatModule } from './chat/chat.module';
import { ChatController } from './chat/chat.controller';
import { FeedModule } from './feed/feed.module';
import { FeedController } from './feed/feed.controller';
import { ServiceSearchModule } from './service-search/service-search.module';
import { ServiceSearchController } from './service-search/service-search.controller';

@Module({
  imports: [
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
        name: 'SERVICE_SEARCH',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4006,
        },
      },
    ]),
  ],
  controllers: [PostController, AuthController, ChatController, FeedController, ServiceSearchController],
})
export class AppModule {}
