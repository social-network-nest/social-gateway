import { Controller, Get, Headers, Inject, Post } from '@nestjs/common';
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

  @Post('find-user')
  async findUserByEmail(@Payload('email') email: string) {
    return this.client.send({ cmd: 'find.user.email' }, email);
  }

  @Get('list-users')
  async listUsers() {
    return this.client.send({ cmd: 'list.users' }, {});
  }
}
