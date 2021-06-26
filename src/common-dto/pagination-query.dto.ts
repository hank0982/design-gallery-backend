import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({ default: 0 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  skip = 0;

  @ApiPropertyOptional({ default: 10 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit = 10;
}
