import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type StudenetDocument = HydratedDocument<Student>;

@Schema()
export class Student {
   @Prop()
   name: string;
   @Prop()
   roleNumber: number;
   @Prop()
   class: number;
   @Prop()
   gender: string;
   @Prop()
   marks: number;
}


 
export const StudentSchema = SchemaFactory.createForClass(Student);