import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { classToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import * as path from 'path';
import { Design, DesignDocument } from 'src/schemas/design.schema';
import { ImageDocument, Image } from 'src/schemas/image.schema';
import { CreateDesignDto } from './dtos/create-design.dto';
import { UpdateDesignDto } from './dtos/update-design.dto';

@Injectable()
export class DesignService {
  constructor(
    @InjectModel(Design.name) private designModel: Model<DesignDocument>,
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>
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
    const updateDesignInstance = classToPlain(updateDesignDto);
    return await this.designModel
      .findOneAndUpdate({ _id: id }, updateDesignInstance)
      .exec();
  }

  async removeAll() {
    return await this.designModel.remove().exec();
  }

  async remove(id: string) {
    return await this.designModel.findOneAndDelete({ _id: id }).exec();
  }

  async saveImage(fileName: string, originalFileName: string, size: number, hostname: string) {
    return await this.imageModel.create(
      {
        originalFileName,
        newFileName: fileName,
        url: `${hostname}/uploads/${fileName}`,
        uuid: path.parse(fileName).name,
        size,
      }
    )
  }
}
