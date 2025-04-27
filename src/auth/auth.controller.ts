import { Controller, Get, Headers, Inject, Param, Post } from '@nestjs/common';
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

  @Get('user/:id')
  async findUserByEmail(
    @Param('id') id: string,
  ) {
    return this.authService.find(id);
  }

  @Get('list-users')
  async listUsers() {
    return this.authService.listUsers();
  }
}
