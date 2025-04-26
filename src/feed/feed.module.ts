import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FeedController],
  imports: [
    ClientsModule.register([
      {
        name: 'FEED_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4005,
        },
      },
    ]),
    AuthModule,
  ],
  providers: [FeedService],
})
export class FeedModule {}
