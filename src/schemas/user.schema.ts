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

  @Prop({type: Object})
  surveyInfo?: ISurveyInfo;
}

export const UserSchema = SchemaFactory.createForClass(User);

enum EGender {
  MALE='MALE',
  FEMALE='FEMALE',
  OTHER='OTHER'
}

enum EDesignBackground {
  NONE='NONE',
  SELF_TAUGHT='SELF_TAUGHT',
  SOME_COURSES='SOME_COURSES',
  ASSOCIATE_DEGREE='ASSOCIATE_DEGREE',
  BACHELOR='BACHELOR',
  MASTER='MASTER'
}

enum EYearsOfProfessionalExperience {
  NONE='NONE',
  LESS_THAN_ONE='LESS_THAN_ONE',
  ONE_TO_THREE='ONE_TO_THREE',
  THREE_TO_FIVE='THREE_TO_FIVE',
  MORE_THAN_FIVE='MORE_THAN_FIVE'
}

interface IQuizResult {
  appropriateness: number;
  emphasis: number;
  hierarchy: number;
  alignment: number;
  consistency: number;
  readability: number;
}

export interface ISurveyInfo {
  // 0 will be demography
  // 1 will be phase 1
  // ...
  currentPhase: number;
  
  currentStep: number;

  age: number;
  
  gender: EGender;

  email: string;

  levelOfExpertise: number;

  designEducationBackground: EDesignBackground;
  
  yearsOfProfessionalExperience: EYearsOfProfessionalExperience;

  infoSource?: string;

  firstQuizResult?: IQuizResult[];
  
  finalQuizResult?: IQuizResult[];
  
  firstDesignId?: string;

  finalDesignId?: string;

}

