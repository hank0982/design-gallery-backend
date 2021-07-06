import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { classToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { ImageDocument, Image } from 'src/schemas/image.schema';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImageService {

  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>
  ){}

  async findAll() {
    return await this.imageModel.find().exec();
  }

  async findOne(id: string) {
    return await this.imageModel.findOne({_id: id}).exec();
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    return await this.imageModel.findByIdAndUpdate(id, classToPlain(updateImageDto));
  }

  async remove(id: string) {
    return await this.imageModel.findByIdAndDelete(id);
  }

  async removeAll() {
    return await this.imageModel.remove().exec();
  }
}
