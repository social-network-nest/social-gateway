import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('post')
export class PostController {
  constructor(@Inject('POST_SERVICE') private readonly client: ClientProxy) {}

  @Post('create')
  async create() {
    return this.client.send({ cmd: 'create_post' }, {});
  }

  @Get()
  async findAll() {
    return this.client.send({ cmd: 'find_all_posts' }, {});
  }
}
