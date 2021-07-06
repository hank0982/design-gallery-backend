import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: 'String', required: true })
  name: string;

  @Prop({ type: 'String', required: true })
  password: string;

  @Prop({ type: 'String', unique: true, required: true })
  username: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  projectIds: mongoose.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }] })
  ratingIds: mongoose.ObjectId[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackUnit' }],
  })
  feedbackUnitIds: mongoose.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
