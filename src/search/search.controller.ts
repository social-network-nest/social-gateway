import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';

@Controller('search')
export class SearchController {
  constructor(@Inject('SEARCH_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  async search(@Payload() payload: any) {
    return this.client.send({ cmd: 'search' }, payload);
  }
}
