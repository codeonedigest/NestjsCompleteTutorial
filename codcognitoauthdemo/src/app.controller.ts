import { Controller, Get, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { UserLoginDto } from './UserLoginDto';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  async loginUser(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) res,
  ) {
    console.log("i am here - ", userLoginDto.email + "   " + userLoginDto.password);
    const result = await this.appService.loginUser(userLoginDto);
    if (result['status'] === 'failure') {
      return new UnauthorizedException(result);
    }
    const token = result['token'];
    delete result['token'];
    res.header('Access-Token', token).status(HttpStatus.OK).send(result);
  }
}
