import { Body, Controller, Delete, Get, Headers, Inject, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
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

  @Patch(':id')
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
    return this.postService.delete(authorization, id);
  }
}
