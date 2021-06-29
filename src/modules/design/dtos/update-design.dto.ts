import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { CreateDesignDto } from './create-design.dto';

export class UpdateDesignDto extends PartialType(CreateDesignDto) {
  @IsNumber()
  @IsOptional()
  @Max(5)
  @Min(0)
  averageOfOverallQuality: number;
}
