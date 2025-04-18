import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';

@Controller('feed')
export class FeedController {
  constructor(
    @Inject('FEED_SERVICE') private readonly client: ClientProxy
  ) {}

  @Post()
  async createFeed(@Payload() payload: any) {
    return this.client.send({ cmd: 'create_feed' }, payload)
  }
}
