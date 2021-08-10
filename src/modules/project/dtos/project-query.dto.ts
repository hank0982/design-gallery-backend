import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PaginationQueryDto } from 'src/common-dtos/pagination-query.dto';
import { OVERALL_QUALITY_MAX, OVERALL_QUALITY_MIN, TEXT_PROPORTION_MAX, TEXT_PROPORTION_MIN, TEXT_QUANTITY_MAX, TEXT_QUANTITY_MIN } from 'src/constants/properties-limitation.constant';
import { EDesignImageUsages } from 'src/enums/design-image-usage.enum';

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
  @IsArray()
  @IsEnum(EDesignImageUsages, { each: true })
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value.split(',').map((x) => EDesignImageUsages[x]))
  imageUsage: EDesignImageUsages[];

  @ApiPropertyOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Max(TEXT_PROPORTION_MAX, { each: true })
  @Min(TEXT_PROPORTION_MIN, { each: true })
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value.split(',').map((x) => Number(x)))
  textProportion: number[];

  @ApiPropertyOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Max(TEXT_QUANTITY_MAX, { each: true })
  @Min(TEXT_QUANTITY_MIN, { each: true })
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value.split(',').map((x) => Number(x)))
  textQuantity: number[];

  @ApiPropertyOptional({ minimum: OVERALL_QUALITY_MIN, maximum: OVERALL_QUALITY_MAX })
  @IsNumber()
  @IsOptional()
  @Max(OVERALL_QUALITY_MAX)
  @Min(OVERALL_QUALITY_MIN)
  @Type(() => Number)
  overallQuality: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  subaspects: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => String)
  mainColor: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => String)
  dominantColor: string;
}
