import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type CreatorDocument = Creator & Document;

@Schema({ timestamps: true })
export class Creator {
  @Prop(String)
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  projects: mongoose.ObjectId[];
}

export const CreatorSchema = SchemaFactory.createForClass(Creator);
