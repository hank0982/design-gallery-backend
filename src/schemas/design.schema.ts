import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { designImageUsages, EDesignImageUsages } from 'src/enums/design-image-usage.enum';
import { OVERALL_QUALITY_MAX, OVERALL_QUALITY_MIN, TEXT_PROPORTION_MAX, TEXT_PROPORTION_MIN, TEXT_QUANTITY_MAX, TEXT_QUANTITY_MIN } from 'src/constants/properties-limitation.constant';

export type DesignDocument = Design & Document;

@Schema({ timestamps: true })
export class Design {
  @Prop(String)
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  projectId: mongoose.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }] })
  ratingIds: mongoose.ObjectId[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackUnit' }],
  })
  feedbackUnitIds: mongoose.ObjectId[];

  @Prop(Number)
  version: number;

  @Prop(String)
  imageUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
  imageId: string;

  @Prop(String)
  mainColor: string;

  @Prop(String)
  dominantColor: string;

  @Prop({ type: 'Number', min: TEXT_PROPORTION_MIN, max: TEXT_PROPORTION_MAX })
  textProportion: number;

  @Prop({ type: 'Number', min: TEXT_QUANTITY_MIN, max: TEXT_QUANTITY_MAX })
  textQuantity: number;

  @Prop({ type: 'Number', min: OVERALL_QUALITY_MIN, max: OVERALL_QUALITY_MAX })
  overallQuality: number;

  @Prop(String)
  rational: string;

  @Prop({
    type: 'String',
    enum: designImageUsages,
  })
  imageUsage: EDesignImageUsages; 
}

export const DesignSchema = SchemaFactory.createForClass(Design);
