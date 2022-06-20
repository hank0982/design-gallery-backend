import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserActivity, UserActivityDocument } from 'src/schemas/user-activity.schema';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { UpdateUserActivityDto } from './dto/update-user-activity.dto';

@Injectable()
export class UserActivityService {
  constructor(
    @InjectModel(UserActivity.name) private userActivityModel: Model<UserActivityDocument>,
  ) {}

  async create(createUserActivityDto: CreateUserActivityDto) {
    return await this.userActivityModel.create(createUserActivityDto);
  }

  // push the logs to the session
  async update(userActivityId: string, updateUserActivityDto: UpdateUserActivityDto) {
    return await this.userActivityModel.findById(userActivityId).update({
      $push: {logs: { $each: updateUserActivityDto.logs } }
    });
  }

  async findAll() {
    return await this.userActivityModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userActivityModel.findById(id);
  }

  async remove(id: string) {
    return await this.userActivityModel.findByIdAndDelete(id);
  }
}
