import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FeedbackUnit,
  FeedbackUnitDocument,
} from 'src/schemas/feedback-unit.schema';
import { CreateFeedbackUnitDto } from './dtos/create-feedback-unit.dto';
import { UpdateFeedbackUnitDto } from './dtos/update-feedback-unit.dto';

@Injectable()
export class FeedbackUnitService {
  constructor(
    @InjectModel(FeedbackUnit.name)
    private feedbackUnitModel: Model<FeedbackUnitDocument>,
  ) {}

  async create(createFeedbackUnitDto: CreateFeedbackUnitDto) {
    return await this.feedbackUnitModel.create(createFeedbackUnitDto);
  }

  async findAll() {
    return await this.feedbackUnitModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} feedbackUnit`;
  }

  update(id: number, updateFeedbackUnitDto: UpdateFeedbackUnitDto) {
    return `This action updates a #${id} feedbackUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedbackUnit`;
  }
}
