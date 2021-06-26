import { ApiProperty } from '@nestjs/swagger';
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

export class CreateIterationDto {
  @ApiProperty({ type: String })
  @IsString()
  projectId: ObjectId;

  @ApiProperty({ type: String })
  @IsString()
  oldDesignId: ObjectId;

  @ApiProperty({ type: String })
  @IsString()
  newDesignId: ObjectId;

  @ApiProperty()
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({ enum: EDesignAspect, enumName: 'EDesignAspect' })
  @IsEnum(EDesignAspect)
  aspect: EDesignAspect;

  @ApiProperty({
    maximum: 5,
    minimum: 1,
  })
  @IsNumber()
  @Max(5)
  @Min(1)
  degreeOfRevision: number;
}
