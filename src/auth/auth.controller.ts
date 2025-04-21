import { Controller, Headers, Inject, Post } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('login')
  async login(@Payload() payload: any) {
    return this.client.send({ cmd: 'login' }, payload);
  }

  @Post('register')
  async register(@Payload() payload: any) {
    return this.client.send({ cmd: 'register' }, payload);
  }

  @Post('verify-token')
  async verifyToken(@Headers('authorization') autorization: string) {
    const token = autorization?.replace('Bearer ', '');
    if (!token) return { valid: false, message: 'No token provided' };
    return this.client.send({ cmd: 'verify.token' }, token);
  }
}
