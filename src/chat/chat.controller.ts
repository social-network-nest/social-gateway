import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
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
  async listChat(
    @Headers('authorization') authorization: string,
  ) {
    const { userId } = await this.authService.accessToken(authorization);
    return this.chatService.listChat(userId);
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

  @Get(':chatId')
  async showMessageChat(
    @Headers('authorization') authorization: string,
    @Param('chatId') chatId: string,
  ) {
    await this.authService.accessToken(authorization);
    return this.chatService.showMessageChat(chatId);
  }
}
