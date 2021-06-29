import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber, Max, Min } from 'class-validator';
import { ObjectId } from 'mongoose';
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

  @ApiProperty({ maximum: 5, minimum: 1 })
  @IsNumber()
  @Max(5)
  @Min(1)
  rating: number;
}
