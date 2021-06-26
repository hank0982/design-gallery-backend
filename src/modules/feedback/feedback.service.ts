import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { classToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { Feedback, FeedbackDocument } from 'src/schemas/feedback.schema';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { UpdateFeedbackDto } from './dtos/update-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    return await this.feedbackModel.create(createFeedbackDto);
  }

  async findAll() {
    return await this.feedbackModel.find().exec();
  }

  async findOne(id: string) {
    return await this.feedbackModel.findById(id).exec();
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    const updatePayload = classToPlain(updateFeedbackDto);
    return await this.feedbackModel.findByIdAndUpdate(id, updatePayload).exec();
  }

  async remove(id: string) {
    return await this.feedbackModel.findByIdAndRemove(id).exec();
  }
}
