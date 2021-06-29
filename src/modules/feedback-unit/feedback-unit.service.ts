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

  async findOne(id: string) {
    return await this.feedbackUnitModel.findById(id).exec();
  }

  async update(id: string, updateFeedbackUnitDto: UpdateFeedbackUnitDto) {
    return await this.feedbackUnitModel
      .findByIdAndUpdate(id, updateFeedbackUnitDto)
      .exec();
  }

  async remove(id: number) {
    return await this.feedbackUnitModel.findByIdAndDelete(id).exec();
  }
}
