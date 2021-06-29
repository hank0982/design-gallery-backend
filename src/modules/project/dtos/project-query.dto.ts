import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PaginationQueryDto } from 'src/common-dtos/pagination-query.dto';

export class ProjectQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  sources: string[];

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  categories: string[];

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  imageUsage: boolean;

  @ApiPropertyOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Max(5, { each: true })
  @Min(1, { each: true })
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value.split(',').map((x) => Number(x)))
  amountOfText: number[];

  @ApiPropertyOptional({ minimum: 1, maximum: 5 })
  @IsNumber()
  @IsOptional()
  @Max(5)
  @Min(1)
  @Type(() => Number)
  averageOfOverallQuality: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  subaspects: string[];
}
