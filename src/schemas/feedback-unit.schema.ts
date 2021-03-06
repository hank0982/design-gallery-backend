import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { EDesignAspect, designAspects } from 'src/enums/design-aspects.enum';
import {
  designSubaspects,
  EDesignSubaspect,
} from 'src/enums/design-subaspects.enum copy';

export type FeedbackUnitDocument = FeedbackUnit & Document;

@Schema({ timestamps: true })
export class FeedbackUnit {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Design' })
  designId: mongoose.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  feedbackProviderId: mongoose.ObjectId;

  @Prop(String)
  content: string;

  @Prop({ type: 'String', enum: designAspects })
  aspect: EDesignAspect;

  @Prop(String)
  subaspect: string;
  
  @Prop(String)
  sentiment: 'NEUTRAL' | 'POSITIVE' | 'NEGATIVE';

  @Prop({ type: Boolean})
  addressed: boolean;
}

export const FeedbackUnitSchema = SchemaFactory.createForClass(FeedbackUnit);
