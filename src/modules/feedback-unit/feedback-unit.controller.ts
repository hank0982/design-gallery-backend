import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { FeedbackUnitService } from './feedback-unit.service';
import { CreateFeedbackUnitDto } from './dtos/create-feedback-unit.dto';
import { UpdateFeedbackUnitDto } from './dtos/update-feedback-unit.dto';
import { ApiTags } from '@nestjs/swagger';
import { EDesignAspect } from 'src/enums/design-aspects.enum';
import { ErrorMessage } from 'src/error-messages/error-message.en';
import { CreateTopicDto } from './dtos/create-topic.dto';

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
    return await this.feedbackUnitService.remove(id);
  }

  @Post('topics/:aspect')
  async createNewTopic(@Param('aspect') aspect: string, @Body() createNewTopicDto: CreateTopicDto) {
    if (aspect && EDesignAspect[aspect]) {
      return await this.feedbackUnitService.createNewTopic(EDesignAspect[aspect], createNewTopicDto)
    } else {
      throw new BadRequestException(ErrorMessage.AspectIsNotValid);
    }
  }

  @Get('topics/:aspect')
  async getTopic(@Param('aspect') aspect: string) {
    if (aspect && EDesignAspect[aspect]) {
      return await this.feedbackUnitService.getTopics(EDesignAspect[aspect])
    } else {
      throw new BadRequestException(ErrorMessage.AspectIsNotValid);
    }
  }
}
