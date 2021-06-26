import { PartialType } from '@nestjs/swagger';
import { CreateIterationDto } from './create-iteration.dto';

export class UpdateIterationDto extends PartialType(CreateIterationDto) {}
