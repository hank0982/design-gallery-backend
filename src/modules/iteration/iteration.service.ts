import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iteration, IterationDocument } from 'src/schemas/iteration.schema';
import { PaginationResult } from 'src/utils/pagination-result.class';
import { CreateIterationDto } from './dto/create-iteration.dto';
import { IterationQueryDto } from './dto/iteration-query.dto';
import { UpdateIterationDto } from './dto/update-iteration.dto';

@Injectable()
export class IterationService {
  constructor(
    @InjectModel(Iteration.name)
    private iterationModel: Model<IterationDocument>,
  ) {}

  async create(createIterationDto: CreateIterationDto) {
    return await this.iterationModel.create(createIterationDto);
  }

  async findAll(query: IterationQueryDto) {
    const results = await this.iterationModel
      .find()
      .skip(query.skip)
      .limit(query.limit)
      .exec();
    return new PaginationResult(results, query.skip, query.limit).toPayload();
  }

  async findOne(id: string) {
    return await this.iterationModel.findOne({ _id: id });
  }

  async update(id: string, updateIterationDto: UpdateIterationDto) {
    return await this.iterationModel.findOneAndUpdate(
      { _id: id },
      updateIterationDto,
    );
  }

  async remove(id: string) {
    return await this.iterationModel.findOneAndRemove({ _id: id });
  }
}
