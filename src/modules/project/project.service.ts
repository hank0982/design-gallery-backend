import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { classToPlain } from 'class-transformer';
import { isNotEmpty } from 'class-validator';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { Design, DesignDocument } from 'src/schemas/design.schema';
import {
  FeedbackUnit,
  FeedbackUnitDocument,
} from 'src/schemas/feedback-unit.schema';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { PaginationResult } from 'src/utils/pagination-result.util';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectQueryDto } from './dtos/project-query.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(FeedbackUnit.name)
    private feedbackUnitModel: Model<FeedbackUnitDocument>,
    @InjectModel(Design.name) private designModel: Model<DesignDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectModel.create(createProjectDto);
  }

  async findAll(projectQuery: ProjectQueryDto) {
    let projectDocument = this.projectModel.find();
    const projectIdsMatchedDesignProperties =
      await this.queryProjectIdsMatchedDesignProperties(projectQuery);
    const projectIdsMatchSubaspects =
      await this.queryProjectIdsMatchedSubaspects(projectQuery);
    if (projectIdsMatchedDesignProperties.length > 0) {
      projectDocument = projectDocument.find({
        _id: {
          $or: [
            { $in: projectIdsMatchedDesignProperties },
            { $in: projectIdsMatchSubaspects },
          ],
        },
      });
    }
    const coursesAndSourcesQueries =
      this.generateQueryForCategoriesAndSourcesByProjectQuery(projectQuery);
    if (coursesAndSourcesQueries.length > 0) {
      projectDocument = projectDocument.find({
        $and: coursesAndSourcesQueries,
      });
    }

    return new PaginationResult<ProjectDocument>(
      await projectDocument
        .skip(projectQuery.skip)
        .limit(projectQuery.limit)
        .exec(),
      projectQuery.skip,
      projectQuery.limit,
    ).toPayload();
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

  private generateQueryForCategoriesAndSourcesByProjectQuery(
    projectQueryDto: ProjectQueryDto,
  ) {
    const queryAndList = [
      projectQueryDto.sources?.length > 0
        ? { sources: { $in: projectQueryDto.sources } }
        : undefined,
      projectQueryDto.categories?.length > 0
        ? { categories: { $in: projectQueryDto.categories } }
        : undefined,
    ].filter((x) => x);
    return queryAndList;
  }

  private async queryProjectIdsMatchedDesignProperties(
    projectQuery: ProjectQueryDto,
  ) {
    if (
      isNotEmpty(projectQuery.imageUsage) ||
      isNotEmpty(projectQuery.amountOfText) ||
      isNotEmpty(projectQuery.averageOfOverallQuality)
    ) {
      const queriesForDesign = [
        isNotEmpty(projectQuery.amountOfText)
          ? { amountOfText: projectQuery.amountOfText }
          : undefined,
        isNotEmpty(projectQuery.imageUsage)
          ? { imageUsage: projectQuery.imageUsage }
          : undefined,
        isNotEmpty(projectQuery.averageOfOverallQuality)
          ? { averageOfOverallQuality: projectQuery.averageOfOverallQuality }
          : undefined,
      ].filter((x) => x);
      if (queriesForDesign.length > 0) {
        const projectIds = (
          await this.designModel
            .find()
            .and(queriesForDesign.length > 0 ? queriesForDesign : undefined)
            .select('-_id projectId')
            .exec()
        ).map((x) => x.projectId);
        return projectIds;
      }
    }
    return [];
  }

  private async queryProjectIdsMatchedSubaspects(
    projectQuery: ProjectQueryDto,
  ) {
    if (isNotEmpty(projectQuery.subaspects)) {
      const queriesForFeedbackUnit = [
        isNotEmpty(projectQuery.subaspects)
          ? { amountOfText: { $in: projectQuery.subaspects } }
          : undefined,
      ].filter((x) => x);
      if (queriesForFeedbackUnit.length > 0) {
        const projectIds = (
          await this.feedbackUnitModel
            .find()
            .and(
              queriesForFeedbackUnit.length > 0
                ? queriesForFeedbackUnit
                : undefined,
            )
            .select('-_id projectId')
            .exec()
        ).map((x) => x.projectId);
        return projectIds;
      }
    }
    return [];
  }
}

export type IProjectQuery = FilterQuery<ProjectDocument>;
