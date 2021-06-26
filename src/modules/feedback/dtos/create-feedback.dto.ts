import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { EDesignAspect } from 'src/enums/design-aspects.enum';

export class CreateFeedbackDto {
  @ApiProperty({ type: String })
  @IsString()
  designId: ObjectId;

  @ApiProperty({ type: String })
  @IsString()
  projectId: ObjectId;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ enum: EDesignAspect, enumName: 'EDesignAspect' })
  @IsEnum(EDesignAspect)
  aspect: EDesignAspect;

  @ApiProperty({ maximum: 5, minimum: 1 })
  @IsNumber()
  @Max(5)
  @Min(1)
  rating: number;
}
