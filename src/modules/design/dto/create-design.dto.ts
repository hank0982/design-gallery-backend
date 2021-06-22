import {
  IsArray,
  IsBoolean,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateDesignDto {
  @IsString()
  name: string;

  @IsString()
  projectId: ObjectId;

  @IsUrl()
  imageUrl: string;

  @IsNumber()
  version: number;

  @IsBoolean()
  imageUsage: boolean;

  @IsNotEmptyObject()
  mainColor: {
    type: string;
    coordinates: number[];
  };

  @IsNumber()
  @Max(5)
  @Min(0)
  amountOfText: number;

  @IsString()
  @IsOptional()
  rational: string;
}
