import { Module } from '@nestjs/common';
import { CodcircuitbreakerService } from './codcircuitbreaker.service';
import { CodcircuitbreakerController } from './codcircuitbreaker.controller';

@Module({
  providers: [CodcircuitbreakerService],
  controllers: [CodcircuitbreakerController]
})
export class CodcircuitbreakerModule {}
