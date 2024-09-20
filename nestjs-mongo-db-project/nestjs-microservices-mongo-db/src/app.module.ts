import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { StudentSchema } from './schema/student.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config/Configuration';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration]
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri: configService.get('database.url') ,
        };
        return options;
      },
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }])

  ],

  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
