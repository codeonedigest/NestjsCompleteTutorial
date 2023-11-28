import { Controller, Get, Req, Post, Body, HttpCode, Header, Redirect, Param} from '@nestjs/common';
import { Request } from 'express';
import { CatDto } from 'src/domain/CatDto';

@Controller('cats')
export class CatsControllerController {
    @Get()
    findAll(@Req() request: Request): string {
      console.log("url - " + request.url + " Query Param - "+  request.query["name"]);
      return "This action returns all cats " + request.url;
    }

    @Get(':id')  
    findCatById(@Param() params: any): string {
      console.log(params.id);
      return `This action returns a #${params.id} cat`;
    }

    @Get('ab*cd') //abcd, ab_cd, ab-cd
    findCat(@Req() request: Request): string {
      console.log("I am in wildcard route");
      return "I am in wildcard route";
    }

    @Get('catvideo')  
    @Redirect('https://nestjs.com', 301)
    findCatVideo(@Req() request: Request): string {
      console.log("i am redirecting");
      return "i am redirecting";
    }

    @Post()
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    createCat(@Body() catDto: CatDto): String {
        console.log(catDto);
        return 'this is creating animal ' + catDto.name;
    }
}
