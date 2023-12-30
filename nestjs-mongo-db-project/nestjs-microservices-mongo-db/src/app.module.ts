import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { StudentSchema } from './schema/student.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017',{dbName: 'studentdb'}), 
  MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }])],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
