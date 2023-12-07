import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsControllerController } from './cats-controller/cats-controller.controller';
import { CatsService } from './cats-service/CatsService';

@Module({
  imports: [],
  controllers: [AppController, CatsControllerController],
  providers: [AppService, CatsService],
})
export class AppModule {}
