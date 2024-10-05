import { Injectable, Req, Res, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  AWS_S3_BUCKET = 'sea-ecomm-asia-dev';
  s3 = new AWS.S3({
    accessKeyId: 'AKIATNH4OXIMSOQSJKFP',
    secretAccessKey: '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',
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
    const targetLocation = 'POC/Australia/'+String(name);
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
}