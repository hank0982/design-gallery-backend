import { IsEnum, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { EDesignAspect } from 'src/enums/design-aspects.enum';
import { EDesignSubaspect } from 'src/enums/design-subaspects.enum copy';

export class CreateFeedbackUnitDto {
  @IsString()
  designId: ObjectId;

  @IsString()
  projectId: ObjectId;

  @IsString()
  feedbackId: ObjectId;

  @IsString()
  content: string;

  @IsEnum(EDesignAspect)
  aspect: EDesignAspect;

  @IsEnum(EDesignSubaspect)
  subaspect: EDesignSubaspect;
}
