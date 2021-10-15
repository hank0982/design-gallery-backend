import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { classToPlain } from 'class-transformer';
import { isNotEmpty } from 'class-validator';
import { FilterQuery, Model, Mongoose, ObjectId, Types } from 'mongoose';
import { EDesignAspect } from 'src/enums/design-aspects.enum';
import { Design, DesignDocument } from 'src/schemas/design.schema';
import {
  FeedbackUnit,
  FeedbackUnitDocument,
} from 'src/schemas/feedback-unit.schema';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { Rating, RatingDocument } from 'src/schemas/rating.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { PaginationResult } from 'src/utils/pagination-result.util';
import { ObjectID, SimpleConsoleLogger } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectQueryDto } from './dtos/project-query.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import * as util from 'util';
@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>,
    @InjectModel(FeedbackUnit.name) private feedbackUnitModel: Model<FeedbackUnitDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Design.name) private designModel: Model<DesignDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const newProject = await this.projectModel.create(createProjectDto);
    await this.userModel.updateOne(
      {_id: createProjectDto.creatorId}, 
      {$push: {projectIds: newProject._id}}
    );
    return newProject;
  }

  async findAll(projectQuery: ProjectQueryDto) {
    let projectDocument = this.projectModel.find();
    const projectIdsMatchedDesignProperties =
      await this.queryProjectIdsMatchedDesignProperties(projectQuery);
    const projectIdsMatchSubaspects =
      await this.queryProjectIdsMatchedSubaspects(projectQuery);
    console.log(projectIdsMatchSubaspects, "asd")
    console.log(projectIdsMatchedDesignProperties)
    // const projectIdsWithImprovedRating = 
    //   await this.queryProjectIdsWithImprovedSubaspect(projectQuery);
    const projectIdsIntersection = [...new Set([...projectIdsMatchedDesignProperties, ...projectIdsMatchSubaspects]).values()];
    console.log(projectIdsIntersection)
    if (this.isUserQueryDesignProperties(projectQuery) || isNotEmpty(projectQuery.subaspects)) {
      projectDocument = projectDocument.find(
          { _id: { $in: projectIdsIntersection } },
       );
    }
    const coursesAndSourcesQueries =
      this.generateQueryForCategoriesAndSourcesByProjectQuery(projectQuery);
    if (coursesAndSourcesQueries.length > 0) {
      projectDocument = projectDocument.find({
        $and: coursesAndSourcesQueries,
      });
    }
    console.log((await projectDocument.exec()).length)
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

  async findProjectRatingsAndFeedback(id: string) {
    const projectToDesign = await this.projectModel
      .aggregate()
      .match({_id: Types.ObjectId(id)})
      .lookup({
        from: 'designs',
        localField: 'designIds',
        foreignField: '_id',
        as: 'designPayload'
      })
      .project('designPayload._id')
      .unwind('designPayload')
      .project({
        designId: '$designPayload._id'
      }).exec()
    const availableDesignIds = projectToDesign.map(item => item.designId);
    const ratingResult =  await this.ratingModel
      .aggregate()
      .match({designId: {$in: availableDesignIds}})
    const feedbackUnitResult = await this.feedbackUnitModel
      .aggregate()
      .match({designId: {$in: availableDesignIds}})
    return {
      rating: ratingResult,
      feedbackUnitResult,
    };
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
    await this.userModel.updateOne(
      {projectIds: id as any},
      { $pull: {projectIds: id} }
    ).exec()
    await this.designModel.deleteMany({projectId: id as any}).exec();
    return await this.projectModel.deleteOne({ _id: id }).exec();
  }

  async removeAll() {
    return await this.projectModel.remove().exec();
  }

  async findAllRatedProject(aspect: EDesignAspect) {
    const feedbackUnitsWithAspect =
    await this.feedbackUnitModel
      .aggregate()
      .match({
        aspect
      })
      .project('designId')
      .lookup({
        from: 'designs',
        localField: 'designId',
        foreignField: '_id',
        as: 'design',
      }).group(
        { _id: '$design.projectId',  count: { $sum: 1 }}
      )
      .unwind('_id')
      .project({
        _id: 1,
        hasCompleted: {
          $cond: { if: { $gte: ['$count', 1] }, then: true, else: false },
        },
      })
    return feedbackUnitsWithAspect;
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

    console.log(projectQueryDto)
    return queryAndList;
  }

  private async queryProjectIdsMatchedDesignProperties(
    projectQuery: ProjectQueryDto,
  ) {
    if (
      isNotEmpty(projectQuery.imageUsage) ||
      isNotEmpty(projectQuery.textProportion) ||
      isNotEmpty(projectQuery.overallQuality) ||
      isNotEmpty(projectQuery.textQuantity) ||
      isNotEmpty(projectQuery.dominantColor) ||
      isNotEmpty(projectQuery.mainColor)
    ) {
      const queriesForDesign = [
        isNotEmpty(projectQuery.textProportion)
          ? { textProportion: { $in: projectQuery.textProportion } }
          : undefined,
        isNotEmpty(projectQuery.textQuantity)
          ? { textQuantity: { $in: projectQuery.textQuantity } }
          : undefined,
        isNotEmpty(projectQuery.imageUsage)
          ? { imageUsage: { $in: projectQuery.imageUsage } }
          : undefined,
        isNotEmpty(projectQuery.overallQuality)
          ? { overallQuality: projectQuery.overallQuality }
          : undefined,
        isNotEmpty(projectQuery.dominantColor)
          ? { dominantColor: `#${projectQuery.dominantColor}` }
          : undefined,
        isNotEmpty(projectQuery.mainColor)
          ? { mainColor: `#${projectQuery.mainColor}` }
          : undefined,
      ].filter((x) => x);
      if (queriesForDesign.length > 0) {
        const projectIds = (
          await this.designModel
            .find()
            .and(queriesForDesign)
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
      const queriesForFeedbackUnit = isNotEmpty(projectQuery.subaspects)
      ? { subaspect: { $in: projectQuery.subaspects } } : undefined;
      console.log(queriesForFeedbackUnit)
      if (queriesForFeedbackUnit) {
        const subaspectNumberMap = new Map<string, Set<string>>();
        const selectedDesignIds = [];
        (await this.feedbackUnitModel
            .find(queriesForFeedbackUnit)
            .select('designId subaspect')
            .exec()
        ).forEach((x) => {
          console.log(x)
          if (subaspectNumberMap.get(String(x.designId)) !== undefined) {
            subaspectNumberMap.get(String(x.designId)).add(x.subaspect)
          } else {
            subaspectNumberMap.set(String(x.designId), new Set([x.subaspect]));
          }
          if (subaspectNumberMap.get(String(x.designId)).size === projectQuery.subaspects.length) {
            selectedDesignIds.push(x.designId);
          }
        });
        console.log(subaspectNumberMap)

        console.log(selectedDesignIds)
        const projectIds = await this.designModel
          .find({
            _id: { $in: selectedDesignIds },
          })
          .select('-_id projectId')
          .exec();
        console.log(projectIds)
        return projectIds.map(x => x.projectId);
      }
    }
    return [];
  }

  private async queryProjectIdsWithImprovedSubaspect(
    projectQuery: ProjectQueryDto,
  ) {
    if (isNotEmpty(projectQuery.improvedSubaspects)) {
      console.log(await this.designModel.find().exec())
      const ratings = await this.designModel.aggregate().lookup({
        from: 'ratings',
        localField: 'ratingIds',
        foreignField: '_id',
        as: 'ratings',
      }).exec();
      ratings.map(x => {
        return {
          projectId: x.projectId,
          version: x.version,
          rating: x.ratings
        }
      });
    }
    return [];
  }

  private isUserQueryDesignProperties(projectQuery: ProjectQueryDto): boolean {
    return isNotEmpty(projectQuery.imageUsage) ||
    isNotEmpty(projectQuery.textProportion) ||
    isNotEmpty(projectQuery.overallQuality) ||
    isNotEmpty(projectQuery.textQuantity) ||
    isNotEmpty(projectQuery.dominantColor) ||
    isNotEmpty(projectQuery.mainColor)
  }
}

export type IProjectQuery = FilterQuery<ProjectDocument>;
