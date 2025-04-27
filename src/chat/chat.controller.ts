import { Controller, Get, Headers } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthService } from 'src/auth/auth.service';

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
}
