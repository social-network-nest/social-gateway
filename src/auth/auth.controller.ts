import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  async login() {
    return this.client.send({ cmd: 'login_user' }, {});
  }

  @Post('register')
  async register(@Payload() payload: any) {
    return this.client.send({ cmd: 'register' }, payload);
  }
}
