import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ enum: [1, 2, 3], default: 2 }) // 1: Read, 2: To Be Read, 3: Reading
  status: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
