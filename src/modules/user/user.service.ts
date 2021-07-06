import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as mongoose from 'mongoose';
import { EDesignAspect } from 'src/enums/design-aspects.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    try {
      await this.userModel.create(createUserDto);
    } catch (e) {
      throw e;
    }
    delete createUserDto.password;
    return createUserDto;
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findRatedProjects(id: string) {
    const aspects = [...Object.values(EDesignAspect)];
    const ratingMatches = {};
    aspects.forEach(
      (aspect) => (ratingMatches[`rating.rating.${aspect}`] = { $gt: 0 }),
    );
    return await this.userModel
      .aggregate()
      .match({ _id: new mongoose.Types.ObjectId(id) })
      .lookup({
        from: 'ratings',
        localField: 'ratingIds',
        foreignField: '_id',
        as: 'rating',
      })
      .unwind('rating')
      .project('rating')
      .match(ratingMatches)
      .group({ _id: '$rating.designId', count: { $sum: 1 } })
      .lookup({
        from: 'designs',
        localField: '_id',
        foreignField: '_id',
        as: 'design',
      })
      .unwind('design')
      .project('count design.projectId')
      .group({ _id: '$design.projectId', count: { $sum: '$count' } })
      .project({
        _id: 1,
        hasComplete: {
          $cond: { if: { $gte: ['$count', 2] }, then: true, else: false },
        },
      })
      .exec();
  }

  async findOneById(id: string) {
    if (mongoose.isValidObjectId(id)) {
      return await this.userModel.findById(id).exec();
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async findOneByUsername(username: string) {
    return await this.userModel.findOne({username}).exec();
  }


  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
