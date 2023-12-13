import { Global, Module } from '@nestjs/common';
import { CatsControllerController } from './cats-controller.controller';
import { CatsService } from './CatsService';

@Global()
@Module({
  imports: [],
  controllers: [CatsControllerController],
  providers: [CatsService],
  exports: [CatsService]
})  
export class CatsModule {
    constructor(private catsService: CatsService) {};
}
 