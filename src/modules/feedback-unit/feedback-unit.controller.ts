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
import { CreateFeedbackUnitDto } from './dtos/create-feedback-unit.dto';
import { UpdateFeedbackUnitDto } from './dtos/update-feedback-unit.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('FeedbackUnits')
@Controller('api/feedback-units')
export class FeedbackUnitController {
  constructor(private readonly feedbackUnitService: FeedbackUnitService) {}

  @Post()
  async create(@Body() createFeedbackUnitDto: CreateFeedbackUnitDto) {
    return await this.feedbackUnitService.create(createFeedbackUnitDto);
  }

  @Get()
  async findAll() {
    return await this.feedbackUnitService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.feedbackUnitService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFeedbackUnitDto: UpdateFeedbackUnitDto,
  ) {
    return await this.feedbackUnitService.update(id, updateFeedbackUnitDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.feedbackUnitService.remove(+id);
  }
}
