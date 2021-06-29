import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';
import { PaginationQueryDto } from 'src/common-dtos/pagination-query.dto';

export class RatingQueryDto extends PaginationQueryDto {
  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional()
  raterId: ObjectId;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional()
  designId: ObjectId;
}
