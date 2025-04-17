import { Controller, Inject, Post } from '@nestjs/common';
import { FeedService } from './feed.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('feed')
export class FeedController {
  constructor(
    @Inject('FEED_SERVICE') private readonly client: ClientProxy
  ) {}

    @Post()
    async createFeed() {
      return this.client.send({ cmd: 'create_feed' }, {})
    }
}
