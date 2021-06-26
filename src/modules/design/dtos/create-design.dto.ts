import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
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
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty(String)
  @IsString()
  projectId: ObjectId;

  @ApiProperty()
  @IsUrl()
  imageUrl: string;

  @ApiProperty(Number)
  @IsNumber()
  version: number;

  @ApiProperty(Boolean)
  @IsBoolean()
  imageUsage: boolean;

  @ApiProperty()
  @IsString()
  mainColor: string;

  @ApiProperty()
  @IsNumber()
  @Max(5)
  @Min(0)
  amountOfText: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  rational: string;
}
