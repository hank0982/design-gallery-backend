import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  creatorId: ObjectId;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  categories: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  sources: string[];
}
