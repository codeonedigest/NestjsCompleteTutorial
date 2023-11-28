import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsControllerController } from './cats-controller/cats-controller.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsControllerController],
  providers: [AppService],
})
export class AppModule {}
