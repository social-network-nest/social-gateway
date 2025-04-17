import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('login')
  async login() {
    return this.client.send({ cmd: 'login_user' }, {});
  }
}
