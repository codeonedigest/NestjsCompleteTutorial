import { Global, Module } from '@nestjs/common';
import { CatsControllerController } from './cats-controller.controller';
import { CatsService } from './CatsService';
import { MiddlewareConsumer } from '@nestjs/common';
import { loggerFunction } from 'src/middlewares/LoggerMiddleware';
import { RequestMethod } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  controllers: [CatsControllerController],  
  providers: [CatsService],
  exports: [CatsService]
})  
export class CatsModule {
    constructor(private catsService: CatsService) {};

    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(loggerFunction).exclude(
          { path: 'cats', method: RequestMethod.GET }                    
        )
        .forRoutes({ path: 'cats', method: RequestMethod.POST });
    }
}
 