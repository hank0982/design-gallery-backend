import { Injectable } from '@nestjs/common';
import { CreateIterationDto } from './dto/create-iteration.dto';
import { UpdateIterationDto } from './dto/update-iteration.dto';

@Injectable()
export class IterationService {
  create(createIterationDto: CreateIterationDto) {
    return 'This action adds a new iteration';
  }

  findAll() {
    return `This action returns all iteration`;
  }

  findOne(id: string) {
    return `This action returns a #${id} iteration`;
  }

  update(id: string, updateIterationDto: UpdateIterationDto) {
    return `This action updates a #${id} iteration`;
  }

  remove(id: string) {
    return `This action removes a #${id} iteration`;
  }
}
