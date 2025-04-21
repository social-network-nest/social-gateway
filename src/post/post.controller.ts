import { Controller, Headers, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';

@Controller('post')
export class PostController {
  constructor(
    @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post()
  async create(
    @Headers('authorization') autorization: string,
    @Payload() payload: any
  ) {
    console.log('si cae cae!!')
    const token = autorization?.replace('Bearer ', '');
    if (!token) throw new UnauthorizedException('No token provided');
    console.log(token)

    const tokenValidation = await this.authClient.send({cmd: 'verify.token'}, token).toPromise();

    console.log(tokenValidation)

    if (!tokenValidation.valid) {
      throw new UnauthorizedException(tokenValidation.message || 'Token is invalid or expired');
    }

    return this.postClient.send({ cmd: 'create_post' }, payload);
  }
}
