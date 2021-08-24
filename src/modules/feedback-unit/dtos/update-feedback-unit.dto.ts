import { PartialType } from '@nestjs/swagger';
import { CreateFeedbackUnitDto } from './create-feedback-unit.dto';

export class UpdateFeedbackUnitDto extends PartialType(CreateFeedbackUnitDto) {}
    