import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { designAspects, EDesignAspect } from 'src/enums/topics.enum';

export type IterationDocument = Iteration & Document;

@Schema()
export class Iteration {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  projectId: mongoose.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Design' })
  oldDesignId: mongoose.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Design' })
  newDesignId: mongoose.ObjectId;

  @Prop(String)
  content: string;

  @Prop({ type: String, enum: designAspects })
  aspect: EDesignAspect;

  @Prop({ type: 'Number', min: 0, max: 5 })
  degreeOfRevision: number;
}

export const IterationSchema = SchemaFactory.createForClass(Iteration);
