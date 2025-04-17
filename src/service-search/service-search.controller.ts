import { Controller, Inject, Post } from '@nestjs/common';
import { ServiceSearchService } from './service-search.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('service-search')
export class ServiceSearchController {
  constructor(@Inject('SERVICE_SEARCH') private readonly client: ClientProxy) {}

  @Post()
  async search() {
    return this.client.send({ cmd: 'search' }, {});
  }
}
