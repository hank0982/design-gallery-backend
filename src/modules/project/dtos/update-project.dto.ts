import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiPropertyOptional()
  @IsString()
  improved: string;
}
