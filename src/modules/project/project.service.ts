import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { classToPlain } from 'class-transformer';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectQueryDto } from './dto/project-query.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectModel.create(createProjectDto);
  }

  async findAll(projectQuery: ProjectQueryDto) {
    let query = {};
    const queryAndList = [
      projectQuery.sources?.length > 0
        ? { sources: { $in: projectQuery.sources } }
        : undefined,
      projectQuery.categories?.length > 0
        ? { categories: { $in: projectQuery.categories } }
        : undefined,
    ].filter((x) => x);
    query = {
      $and: queryAndList.length > 0 ? queryAndList : undefined,
    };
    if (queryAndList.length > 0) {
      return await this.projectModel
        .find(query)
        .skip(projectQuery.skip)
        .limit(projectQuery.limit)
        .exec();
    } else {
      return await this.projectModel
        .find()
        .skip(projectQuery.skip)
        .limit(projectQuery.limit)
        .exec();
    }
  }

  async findOne(id: string) {
    return await this.projectModel.findById(id).exec();
  }

  async addDesignToProject(projectId: ObjectId, designId: ObjectId) {
    const originalProject = await this.projectModel.findById(projectId).exec();
    const newDesignIds = [...originalProject.designIds, designId];
    return await this.projectModel.findByIdAndUpdate(
      { _id: projectId },
      { designIds: newDesignIds },
    );
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const updateObject = classToPlain(updateProjectDto);
    return await this.projectModel
      .findByIdAndUpdate({ _id: id }, updateObject)
      .exec();
  }

  async remove(id: string) {
    return await this.projectModel.deleteOne({ _id: id }).exec();
  }

  async removeAll() {
    return await this.projectModel.remove().exec();
  }
}

export type IProjectQuery = FilterQuery<ProjectDocument>;
