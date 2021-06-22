import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { EDesignAspect } from 'src/enums/topics.enum';

export class CreateFeedbackDto {
  @IsString()
  designId: ObjectId;

  @IsString()
  projectId: ObjectId;

  @IsString()
  @IsOptional()
  content: string;

  @IsEnum(EDesignAspect)
  aspect: EDesignAspect;

  @IsNumber()
  rating: number;
}
