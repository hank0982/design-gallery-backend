import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EDesignAspect } from 'src/enums/design-aspects.enum';
import { Design, DesignDocument } from 'src/schemas/design.schema';
import {
  FeedbackUnit,
  FeedbackUnitDocument,
} from 'src/schemas/feedback-unit.schema';
import { Principle, PrincipleDocument, PrincipleSchema } from 'src/schemas/principle.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateFeedbackUnitDto } from './dtos/create-feedback-unit.dto';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateFeedbackUnitDto } from './dtos/update-feedback-unit.dto';

@Injectable()
export class FeedbackUnitService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Principle.name) private principleModel: Model<PrincipleDocument>,
    @InjectModel(Design.name) private designModel: Model<DesignDocument>,
    @InjectModel(FeedbackUnit.name) private feedbackUnitModel: Model<FeedbackUnitDocument>,
  ) {}

  async create(createFeedbackUnitDto: CreateFeedbackUnitDto) {
    const createdFeedbackUnit = await this.feedbackUnitModel.create(createFeedbackUnitDto);
    await this.designModel.updateOne(
      { _id: createFeedbackUnitDto.designId },
      { $push: {feedbackUnitIds: createdFeedbackUnit._id}
    });
    await this.userModel.updateOne(
      { _id: createFeedbackUnitDto.feedbackProviderId },
      { $push: {feedbackUnitIds: createdFeedbackUnit._id}
    });
    return createdFeedbackUnit;
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

  async remove(id: string) {
    await this.designModel.updateMany(
      { feedbackUnitIds: id as any },
      { $pull: {feedbackUnitIds: id } }
    )
    await this.userModel.updateMany(
      { feedbackUnitIds: id as any },
      { $pull: {feedbackUnitIds: id } }
    )
    return await this.feedbackUnitModel.findByIdAndDelete(id).exec();
  }
  
  async createNewTopic(aspect: EDesignAspect, createTopicDto: CreateTopicDto) {
    if (await this.principleModel.findById('default').exec()) {
      return await this.principleModel.findOneAndUpdate({_id: 'default'}, {$push: {[aspect]: createTopicDto.topic}}).exec();
    } else {
      await this.principleModel.create();
      return await this.principleModel.findOneAndUpdate({_id: 'default'}, {$push: {[aspect]: createTopicDto.topic}}).exec();
    }
  }

  async getTopics(aspect: EDesignAspect) {
    const currentPrinciple = await this.principleModel.findById('default').exec();
    if (currentPrinciple) {
      return currentPrinciple[aspect];
    } else {
      await this.principleModel.create({})
      const currentPrinciple = await this.principleModel.findById('default').exec();
      return currentPrinciple[aspect];
    }
  }
}
