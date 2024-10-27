import { Injectable, Req, Res, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AnyArn } from 'aws-sdk/clients/groundstation';


@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  AWS_S3_BUCKET = '<bucket name>';

  s3 = new AWS.S3({
    region: 'ap-southeast-1',
    accessKeyId: '<IAM user key ID>',
    secretAccessKey: '<IAM user secret key>',
  });



  async uploadFile(file) {
    this.logger.log('uploading file ' + file);
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {

    const targetLocation = 'POC/'+String(name);
    const params = {
      Bucket: bucket,
      Key: targetLocation,
      Body: file,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
        },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      this.logger.log('Uploaded file successfully to s3 bucket!! ');
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }


  async listObject(): Promise<any> {
    this.logger.log('Listing objects in S3 bucket');
  
    var params = { 
      Bucket: this.AWS_S3_BUCKET,
      Delimiter: '/',
      Prefix: 'POC/'
     }
   
    let result = await this.s3.listObjectsV2(params).promise();
      
    console.log("List object: " + result )
    return result;  

  }



  async downloadFile() {
    this.logger.log('Downloading file from S3 bucket ');
  
    var params = { 
      Bucket: this.AWS_S3_BUCKET,
      Key: 'POC/flower-jasmin.jpg',
      Expires: 30
     }

     const url = await this.s3.getSignedUrl('getObject', params);

    console.log("Url to download file: " + url);
    return url;
  }


 

}