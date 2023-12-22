import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

export function loggerFunction(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...` + req);
    next();
  };
