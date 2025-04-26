import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwt_secret',
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule,
    PostModule,
    FeedModule,
  ],
})
export class AppModule {}
