import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Social-Gateway');

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  logger.log('Running on Port 3000');
}
bootstrap();