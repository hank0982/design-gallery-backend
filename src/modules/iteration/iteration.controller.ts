import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { IterationService } from './iteration.service';
import { CreateIterationDto } from './dtos/create-iteration.dto';
import { UpdateIterationDto } from './dtos/update-iteration.dto';
import { IterationQueryDto } from './dtos/iteration-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Iterations')
@Controller('api/iterations')
export class IterationController {
  constructor(private readonly iterationService: IterationService) {}

  @Post()
  async create(@Body() createIterationDto: CreateIterationDto) {
    return await this.iterationService.create(createIterationDto);
  }

  @Get()
  async findAll(@Query() iterationQuery: IterationQueryDto) {
    return await this.iterationService.findAll(iterationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.iterationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIterationDto: UpdateIterationDto,
  ) {
    return await this.iterationService.update(id, updateIterationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.iterationService.remove(id);
  }
}
