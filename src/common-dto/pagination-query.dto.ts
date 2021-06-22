import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  skip: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit: number;
}
