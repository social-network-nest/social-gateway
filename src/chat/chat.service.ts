import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ChatService {
    constructor(
        @Inject('CHAT_SERVICE') private readonly chatClient: ClientProxy,
    ) {}

    list() {
        return this.chatClient.send({ cmd: 'list' }, {});
    }
}
