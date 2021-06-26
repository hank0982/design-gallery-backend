import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { EDesignAspect, designAspects } from 'src/enums/design-aspects.enum';

export type FeedbackDocument = Feedback & Document;

@Schema({ timestamps: true })
export class Feedback {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Design' })
  designId: mongoose.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  projectId: mongoose.ObjectId;

  @Prop({ type: String, enum: designAspects })
  aspect: EDesignAspect;

  @Prop(Number)
  rating: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackUnit' }],
  })
  feedbackUnitIds: mongoose.ObjectId[];
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
