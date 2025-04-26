import { Controller, Delete, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { PostService } from './post.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async list(
    @Headers('authorization') authorization: string,
  ) {
    await this.authService.accessToken(authorization);
    return this.postService.list();
  }

  @Post()
  async create(
    @Headers('authorization') authorization: string,
    @Payload() payload: any,
  ) {
    const {userId} = await this.authService.accessToken(authorization)
    payload.userId = userId;
    return this.postService.create(payload);
  }

  @Get(':id')
  async find(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
  ) {
    await this.authService.accessToken(authorization);
    return this.postService.find(id);
  }

  @Patch(':id')
  async update(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
    @Payload() payload: any,
  ) {
    await this.authService.accessToken(authorization);
    payload.postId = id;
    return this.postService.update(payload);
  }

  @Delete(':id')
  async delete(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
  ) {
    await this.authService.accessToken(authorization);
    return this.postService.delete(id);
  }
}
