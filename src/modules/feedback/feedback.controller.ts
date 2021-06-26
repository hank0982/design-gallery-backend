import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Feedback')
@Controller('api/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return await this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  async findAll() {
    return await this.feedbackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.feedbackService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return await this.feedbackService.update(id, updateFeedbackDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.feedbackService.remove(id);
  }
}
