import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type DesignDocument = Design & Document;

@Schema({ timestamps: true })
export class Design {
  @Prop(String)
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  projectId: mongoose.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }] })
  feedbackIds: mongoose.ObjectId[];

  @Prop(Number)
  version: number;

  @Prop(String)
  imageUrl: string;

  @Prop(Boolean)
  imageUsage: boolean;

  @Prop({ type: { type: 'String' }, coordinates: [Number] })
  mainColor: {
    type: string;
    coordinates: number[];
  };

  @Prop({ type: 'Number', min: 0, max: 5 })
  amountOfText: number;

  @Prop({ type: 'Number', min: 0, max: 5 })
  averageOfOverallQuality: number;

  @Prop(String)
  rational: string;
}

export const DesignSchema = SchemaFactory.createForClass(Design);
