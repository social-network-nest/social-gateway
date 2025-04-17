import { Module } from '@nestjs/common';
import { ServiceSearchService } from './service-search.service';
import { ServiceSearchController } from './service-search.controller';

@Module({
  controllers: [ServiceSearchController],
  providers: [ServiceSearchService],
})
export class ServiceSearchModule {}
