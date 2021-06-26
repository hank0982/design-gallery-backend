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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectQueryDto } from './dtos/project-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto);
  }

  @Get()
  async findAll(@Query() projectQuery: ProjectQueryDto) {
    return await this.projectService.findAll(projectQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.projectService.remove(id);
  }

  @Delete()
  async removeAll() {
    return await this.projectService.removeAll();
  }
}
