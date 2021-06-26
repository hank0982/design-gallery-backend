import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from '../project/project.service';
import { DesignService } from './design.service';
import { CreateDesignDto } from './dtos/create-design.dto';
import { UpdateDesignDto } from './dtos/update-design.dto';

@ApiTags('Designs')
@Controller('api/designs')
export class DesignController {
  constructor(
    private readonly designService: DesignService,
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  async create(@Body() createDesignDto: CreateDesignDto) {
    const response = await this.designService.create(createDesignDto);
    await this.projectService.addDesignToProject(
      response.projectId,
      response._id,
    );
    return response;
  }

  @Get()
  async findAll() {
    try {
      return await this.designService.findAll();
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.designService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDesignDto: UpdateDesignDto,
  ) {
    return await this.designService.update(id, updateDesignDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.designService.remove(id);
  }

  @Delete()
  async removeAll() {
    return await this.designService.removeAll();
  }
}
