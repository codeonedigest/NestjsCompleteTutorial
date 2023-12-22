import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

/*@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug('Request...' + req   );
    next();
  } 
}*/


export function loggerFunction(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...` + req);
    next();
  };
