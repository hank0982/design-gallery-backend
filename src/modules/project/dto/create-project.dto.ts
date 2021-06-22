import { IsArray, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  creator: ObjectId;

  @IsOptional()
  @IsString()
  creatorOffDesignGallery: string;

  @IsString({ each: true })
  @IsArray()
  categories: string[];

  @IsString({ each: true })
  @IsArray()
  sources: string[];
}
