import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { OVERALL_QUALITY_MAX, OVERALL_QUALITY_MIN, TEXT_PROPORTION_MAX, TEXT_PROPORTION_MIN, TEXT_QUANTITY_MAX, TEXT_QUANTITY_MIN } from 'src/constants/properties-limitation.constant';
import { designImageUsages, EDesignImageUsages } from 'src/enums/design-image-usage.enum';

export class CreateDesignDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty(String)
  @IsMongoId()
  projectId: ObjectId;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  imageUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  imageId: ObjectId;

  @ApiProperty(Number)
  @IsNumber()
  version: number;

  @IsEnum(EDesignImageUsages)
  @ApiProperty({ enum: designImageUsages, enumName: 'EDesignImageUsages' })
  imageUsage: EDesignImageUsages;

  @ApiProperty()
  @IsString()
  mainColor: string;

  @ApiProperty()
  @IsNumber()
  @Max(OVERALL_QUALITY_MAX)
  @Min(OVERALL_QUALITY_MIN)
  overallQuality: number;

  @ApiProperty()
  @IsNumber()
  @Max(TEXT_PROPORTION_MAX)
  @Min(TEXT_PROPORTION_MIN)
  textProportion: number;

  @ApiProperty()
  @IsNumber()
  @Max(TEXT_QUANTITY_MAX)
  @Min(TEXT_QUANTITY_MIN)
  textQuantity: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  rational: string;
}
