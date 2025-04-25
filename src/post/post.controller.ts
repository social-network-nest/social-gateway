import { Controller, Get, Headers, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get('list')
  async list(
    @Headers('authorization') authorization: string,
  ) {
    return this.postService.list(authorization);
  }

  @Post('create')
  async create(
    @Headers('authorization') authorization: string,
    @Payload() payload: any
  ) {
    return this.postService.create(authorization, payload);
  }
}
