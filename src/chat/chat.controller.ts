import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthService } from 'src/auth/auth.service';
import { Payload } from '@nestjs/microservices';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async list(
    @Headers('authorization') authorization: string,
  ) {
    await this.authService.accessToken(authorization);
    return this.chatService.list();
  }

  @Post()
  async createChat(
    @Headers('authorization') authorization: string,
    @Payload() payload: any,
  ) {
    const { userId } = await this.authService.accessToken(authorization);
    payload.userId = userId;
    return this.chatService.createChat(payload);
  }

  @Post('message')
  async sendMessage(
    @Headers('authorization') authorization: string,
    @Payload() payload: any,
  ) {
    const { userId } = await this.authService.accessToken(authorization);
    payload.userId = userId;
    return this.chatService.sendMessage(payload);
  }
}
