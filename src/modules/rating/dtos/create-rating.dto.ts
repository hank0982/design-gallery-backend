import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber, Max, Min } from 'class-validator';
import { ObjectId } from 'mongoose';
import { RATING_MAX, RATING_MIN } from 'src/constants/properties-limitation.constant';
import { designAspects, EDesignAspect } from 'src/enums/design-aspects.enum';

export class CreateRatingDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  designId: ObjectId;

  @ApiProperty({ type: String })
  @IsMongoId()
  raterId: ObjectId;

  @ApiProperty({ enum: designAspects, enumName: 'EDesignAspect' })
  @IsEnum(EDesignAspect)
  aspect: EDesignAspect;

  @ApiProperty({ maximum: RATING_MAX, minimum: RATING_MIN })
  @IsNumber()
  @Max(RATING_MAX)
  @Min(RATING_MIN)
  rating: number;
}
