import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { designAspects, EDesignAspect } from 'src/enums/design-aspects.enum';
import { EDesignSubaspect } from 'src/enums/design-subaspects.enum copy';

export class CreateFeedbackUnitDto {
  @ApiProperty()
  @IsString()
  designId: ObjectId;

  @ApiProperty()
  @IsString()
  feedbackProviderId: ObjectId;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ enum: designAspects, enumName: 'EDesignAspect' })
  @IsEnum(EDesignAspect)
  aspect: EDesignAspect;

  @ApiPropertyOptional()
  @IsString()
  subaspect: string;

  @IsBoolean()
  @IsOptional()
  addressed: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sentiment: 'NEUTRAL' | 'POSITIVE' | 'NEGATIVE';
}
