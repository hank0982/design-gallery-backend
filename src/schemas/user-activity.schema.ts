import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserActivityDocument = UserActivity & Document;

@Schema({ timestamps: true })
export class UserActivity {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  userId: mongoose.ObjectId

  @Prop()
  logs: RRWebData[];
}

export const UserActivitySchema = SchemaFactory.createForClass(UserActivity);
export type RRWebData = any;