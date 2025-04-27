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

    createChat(payload: any) {
        return this.chatClient.send({ cmd: 'create_chat' }, payload);
    }

    sendMessage(payload: any) {
        return this.chatClient.send({ cmd: 'send_message' }, payload);
    }
}
