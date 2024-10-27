import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Logger,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.logger.log("Received request to upload file " + file);
    return this.appService.uploadFile(file);
  }


  @Get('list')
  async listObjects(): Promise<any> {
    this.logger.log("Listing content of bucket ");
    let responseData = await this.appService.listObject();
    this.logger.log('Response Data ' + responseData);
    return responseData;
  }


  @Get('download')
  async getObjects(): Promise<any> {
    this.logger.log("Downloading file from s3 bucket ");
    let responseData = await this.appService.downloadFile();
    this.logger.log('Response Data ' + responseData);
    return responseData;
  }
}