import { Controller, Get, Req, Post, Body, HttpCode, Header, Redirect, Param, Logger} from '@nestjs/common';
import { Request } from 'express';
import { CatDto } from 'src/domain/CatDto';
import { CatsService } from 'src/cats-service/CatsService';
import { Cat } from 'src/cats-interface/Cat.interface';

@Controller('cats')
export class CatsControllerController {
  logger = new Logger(CatsControllerController.name);

    constructor(private catService: CatsService) {}

    @Post()
    @HttpCode(201)
    @Header('Cache-Control', 'none')
    createCat(@Body() cat: Cat): String {
        this.logger.debug("Creating cat " + cat);
        this.catService.create(cat);
        return 'this cat is created ' + cat.name;
    }

    @Get()
    async findAll(): Promise<Cat[]> {       
      this.logger.debug("Fetching all cats from backend");
      return this.catService.findAll();
    }

    @Get(':name')  
    findCatByName(@Param() params: any): Cat {
      this.logger.debug("Fetching cat from repository" + params.name);
      return this.catService.findByName(params.name);
    }


    @Get(':id')  
    findCatById(@Param() params: any): string {
      this.logger.debug(params.id);
      return `This action returns a #${params.id} cat`;
    }

    @Get('ab*cd') //abcd, ab_cd, ab-cd
    findCat(@Req() request: Request): string {
      this.logger.debug("I am in wildcard route");
      return "I am in wildcard route";
    }

    @Get('catvideo')  
    @Redirect('https://nestjs.com', 301)
    findCatVideo(@Req() request: Request): string {
      this.logger.debug("i am redirecting");
      return "i am redirecting";
    }

    
}
