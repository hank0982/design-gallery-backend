import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { classToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { Design, DesignDocument } from 'src/schemas/design.schema';
import { CreateDesignDto } from './dtos/create-design.dto';
import { UpdateDesignDto } from './dtos/update-design.dto';

@Injectable()
export class DesignService {
  constructor(
    @InjectModel(Design.name) private designModel: Model<DesignDocument>,
  ) {}

  async create(createDesignDto: CreateDesignDto) {
    const payload = classToPlain(createDesignDto);
    return await this.designModel.create(payload);
  }

  async findAll() {
    return await this.designModel.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.designModel.findById(id).exec();
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, updateDesignDto: UpdateDesignDto) {
    return await this.designModel
      .findOneAndUpdate({ _id: id }, updateDesignDto)
      .exec();
  }

  async removeAll() {
    return await this.designModel.remove().exec();
  }

  async remove(id: string) {
    return await this.designModel.findOneAndDelete({ _id: id }).exec();
  }
}
