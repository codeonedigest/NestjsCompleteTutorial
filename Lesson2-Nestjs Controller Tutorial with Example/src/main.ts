import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerFunction } from './middlewares/LoggerMiddleware';
 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(loggerFunction);
  await app.listen(3000);
}
bootstrap();
