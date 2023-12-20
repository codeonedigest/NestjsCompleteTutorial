import { Controller, Get, Render, Post, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Param, Body, Res } from '@nestjs/common/decorators';


@Controller()
export class AppController {
  logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  public async loadHomePage() {
    return { message: 'Hello Welcome to MVC Testing!!' };
  }

  @Render('response')
  @Post()
    public async displayFormResponse(@Body() params: any, @Res() res: Response) {
      this.logger.debug("Saving username "+ params.username);
      this.logger.debug("Saving password "+ params.password);
      //return {message: "Saved", username: params.username, password: params.password};
      return {user_id:"583c3ac3f38e84297c002546",email:"test@test.com",name:"pawan",family_name:"modi",nickname:"codeonedigest",age:"25",gender:"M",email_verified:true};
       
    }
  
}
