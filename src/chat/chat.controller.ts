import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';

@Controller('chat')
export class ChatController {
  constructor(
    @Inject('CHAT_SERVICE') private readonly client: ClientProxy
  ) {}

  @Post()
  async createChat(@Payload() payload: any) {
    return this.client.send({ cmd: 'create_chat' }, payload)
  }
}
