import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema({ timestamps: true })
export class Image {
  @Prop(String)
  originalFileName: string;

  @Prop(String)
  newFileName: string;

  @Prop(String)
  url: string;

  @Prop(String)
  uuid: string;

  @Prop(Number)
  size: number;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
