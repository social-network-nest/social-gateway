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
  list(
    @Headers('authorization') authorization: string,
  ) {
    return this.feedService.list();
  }

  @Post()
  async create(
    @Headers('authorization') authorization: string,
    @Payload() payload: any,
  ) {
    return this.feedService.create(payload);
  }

  @Get(':id')
  find(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
  ) {
    return this.feedService.find(id);
  }

  @Patch(':id')
  update(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
    @Payload() payload: any,
  ) {
    return this.feedService.update(payload);
  }

  @Delete(':id')
  delete(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
  ) {
    return this.feedService.delete(id);
  }
}
