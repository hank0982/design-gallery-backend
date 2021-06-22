import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop(String)
  name: string;

  @Prop(String)
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Design' }] })
  designIds: mongoose.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Creator' })
  creator: mongoose.ObjectId;

  @Prop(String)
  creatorOffDesignGallery: string;

  @Prop([String])
  categories: string[];

  @Prop([String])
  sources: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
