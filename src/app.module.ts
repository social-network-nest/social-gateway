import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { ChatModule } from './chat/chat.module';
import { ChatController } from './chat/chat.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4001
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4002
        },
      },
      {
        name: 'CHAT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4004
        },
      },
    ]),
  ],
  controllers: [PostController, AuthController, ChatController],
})
export class AppModule {}
