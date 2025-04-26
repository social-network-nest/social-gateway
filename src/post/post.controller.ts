import { Controller, Delete, Get, Headers, Inject, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get('list')
  list(
    @Headers('authorization') authorization: string,
  ) {
    return this.postService.list(authorization);
  }

  @Post('find')
  find(
    @Headers('authorization') authorization: string,
    @Payload() payload: any
  ) {
    return this.postService.find(authorization, payload);
  }

  @Post('create')
  create(
    @Headers('authorization') authorization: string,
    @Payload() payload: any
  ) {
    return this.postService.create(authorization, payload);
  }

  @Patch('update')
  update(
    @Headers('authorization') authorization: string,
    @Payload() payload: any
  ) {
    return this.postService.update(authorization, payload);
  }

  @Delete('delete')
  delete(
    @Headers('authorization') authorization: string,
    @Payload() payload: any
  ) {
    return this.postService.delete(authorization, payload);
  }
}
