import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';

@Controller('post')
export class PostController {
  constructor(
    @Inject('POST_SERVICE') private readonly client: ClientProxy
  ) {}

  @Post()
  async create(@Payload() payload: any) {
    return this.client.send({ cmd: 'create_post' }, payload);
  }
}
