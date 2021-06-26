import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedbackUnitService } from './feedback-unit.service';
import { CreateFeedbackUnitDto } from './dto/create-feedback-unit.dto';
import { UpdateFeedbackUnitDto } from './dto/update-feedback-unit.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('FeedbackUnits')
@Controller('api/feedback-units')
export class FeedbackUnitController {
  constructor(private readonly feedbackUnitService: FeedbackUnitService) {}

  @Post()
  create(@Body() createFeedbackUnitDto: CreateFeedbackUnitDto) {
    return this.feedbackUnitService.create(createFeedbackUnitDto);
  }

  @Get()
  findAll() {
    return this.feedbackUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackUnitService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedbackUnitDto: UpdateFeedbackUnitDto,
  ) {
    return this.feedbackUnitService.update(+id, updateFeedbackUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackUnitService.remove(+id);
  }
}
