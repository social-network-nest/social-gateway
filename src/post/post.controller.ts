import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('post')
export class PostController {
  constructor(@Inject('POST_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  async create() {
    return this.client.send({ cmd: 'create_post' }, {});
  }
}
