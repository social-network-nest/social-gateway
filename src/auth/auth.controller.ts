import { Controller, Get, Headers, Inject, Post } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(
    @Payload() payload: any,
  ) {
    return this.authService.login(payload);
  }

  @Post('register')
  async register(
    @Payload() payload: any,
  ) {
    return this.authService.register(payload);
  }

  @Post('verify-token')
  async verifyToken(
    @Headers('authorization') autorization: string,
  ) {
    return this.authService.verifyToken(autorization);
  }

  @Post('find-user')
  async findUserByEmail(
    @Payload('email') email: string,
  ) {
    return this.authService.findUserByEmail(email);
  }

  @Get('list-users')
  async listUsers() {
    return this.authService.listUsers();
  }
}
