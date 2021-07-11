import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { EDesignAspect, designAspects } from 'src/enums/design-aspects.enum';
import { IsNumber, IsOptional } from 'class-validator';

export type RatingDocument = Rating & Document;
export class AspectRating extends Document {
  @Prop({ type: 'Number' })
  @IsNumber()
  @IsOptional()
  APPROPRIATENESS: number;

  @Prop({ type: 'Number' })
  @IsNumber()
  @IsOptional()
  EMPHASIS: number;

  @Prop({ type: 'Number' })
  @IsNumber()
  @IsOptional()
  ALIGNMENT: number;

  @Prop({ type: 'Number' })
  @IsNumber()
  @IsOptional()
  HIERARCHY: number;

  @Prop({ type: 'Number' })
  @IsNumber()
  @IsOptional()
  CONSISTENCY: number;

  @Prop({ type: 'Number' })
  @IsNumber()
  @IsOptional()
  READABILITY: number;
}

@Schema({ timestamps: true })
export class Rating {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Design' })
  designId: mongoose.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  raterId: mongoose.ObjectId;

  @Prop({ type: AspectRating })
  rating: AspectRating;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
