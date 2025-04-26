import { Body, Controller, Delete, Get, Headers, Inject, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { PostService } from './post.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly authService: AuthService,
  ) {}

  @Get('list')
  list(
    @Headers('authorization') authorization: string,
  ) {
    this.authService.accessToken(authorization);
    return this.postService.list();
  }

  @Post('create')
  create(
    @Headers('authorization') authorization: string,
    @Payload() payload: any
  ) {
    return this.postService.create(authorization, payload);
  }

  @Get(':id')
  find(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
  ) {
    return this.postService.find(authorization, id);
  }

  @Patch('update')
  update(
    @Headers('authorization') authorization: string,
    @Payload() payload: any
  ) {
    return this.postService.update(authorization, payload);
  }

  @Delete(':id')
  delete(
    @Headers('authorization') authorization: string,
    @Param('id') id: string
  ) {
    this.authService.accessToken(authorization);
    return this.postService.delete(id);
  }
}
