import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('search')
export class SearchController {
  constructor(@Inject('SEARCH_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  async search() {
    return this.client.send({ cmd: 'search' }, {});
  }
}
