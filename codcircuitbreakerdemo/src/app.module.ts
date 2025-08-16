import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodcircuitbreakerModule } from './codcircuitbreaker/codcircuitbreaker.module';

@Module({
  imports: [CodcircuitbreakerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
