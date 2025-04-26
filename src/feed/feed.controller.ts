import { Controller, Get, Post, Headers, Param, Patch, Delete } from '@nestjs/common';
import { FeedService } from './feed.service';
import { Payload } from '@nestjs/microservices';
import { AuthService } from 'src/auth/auth.service';

@Controller('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async list(
    @Headers('authorization') authorization: string,
  ) {
    await this.authService.accessToken(authorization);
    return this.feedService.list();
  }

  @Post()
  async create(
    @Headers('authorization') authorization: string,
    @Payload() payload: any,
  ) {
    const {userId} = await this.authService.accessToken(authorization)
    payload.userId = userId;
    return this.feedService.create(payload);
  }

  @Get(':id')
  async find(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
  ) {
    await this.authService.accessToken(authorization);
    return this.feedService.find(id);
  }

  @Patch(':id')
  async update(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
    @Payload() payload: any,
  ) {
    await this.authService.accessToken(authorization);
    payload.feedId = id;
    return this.feedService.update(payload);
  }

  @Delete(':id')
  async delete(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
  ) {
    await this.authService.accessToken(authorization);
    return this.feedService.delete(id);
  }
}
