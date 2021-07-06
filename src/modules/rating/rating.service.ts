import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { classToPlain } from 'class-transformer';
import { isNotEmpty } from 'class-validator';
import { Model, ObjectId } from 'mongoose';
import { ErrorMessage } from 'src/error-messages/error-message.en';
import { Design, DesignDocument } from 'src/schemas/design.schema';
import { Rating, RatingDocument } from 'src/schemas/rating.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { PaginationResult } from 'src/utils/pagination-result.util';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { RatingQueryDto } from './dtos/rating-query.dto';
import { UpdateRatingDto } from './dtos/update-rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Design.name) private designModel: Model<DesignDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>,
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    if (!(await this.userModel.findById(createRatingDto.raterId).exec())) {
      throw new NotFoundException(ErrorMessage.RaterNotFound);
    } else if (
      !(await this.designModel.findById(createRatingDto.designId).exec())
    ) {
      throw new NotFoundException(ErrorMessage.DesignNotFound);
    } else if (
      await this.isRatingDuplicated(
        createRatingDto.raterId,
        createRatingDto.designId,
      )
    ) {
      const queryForRating = {
        $and: [
          { raterId: createRatingDto.raterId },
          { designId: createRatingDto.designId },
        ],
      };
      await this.ratingModel
        .findOneAndUpdate(queryForRating, {
          $set: {
            [`rating.${createRatingDto.aspect}`]: createRatingDto.rating,
          },
        })
        .exec();
      return await this.ratingModel.findOne(queryForRating).exec();
    } else {
      const newRating = await this.ratingModel.create({
        raterId: createRatingDto.raterId,
        designId: createRatingDto.designId,
        rating: {
          [createRatingDto.aspect]: createRatingDto.rating,
        },
      });
      await this.userModel.updateOne(
        { _id: createRatingDto.raterId },
        { $push: { ratingIds: newRating._id } },
      );
      return newRating;
    }
  }

  async findAll(query: RatingQueryDto) {
    const queryForRating = [
      isNotEmpty(query.raterId) ? { raterId: query.raterId } : undefined,
      isNotEmpty(query.designId) ? { designId: query.designId } : undefined,
    ].filter((x) => !!x);
    let ratingModelQuery = this.ratingModel.find();
    if (queryForRating.length > 0) {
      ratingModelQuery = ratingModelQuery.and(queryForRating);
    }
    const results = await ratingModelQuery
      .skip(query.skip)
      .limit(query.limit)
      .exec();
    return new PaginationResult(results, query.skip, query.limit).toPayload();
  }

  async findOne(id: string) {
    return await this.ratingModel.findById(id).exec();
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    const updatePayload = classToPlain(updateRatingDto);
    return await this.ratingModel.findByIdAndUpdate(id, updatePayload).exec();
  }

  async remove(id: string) {
    return await this.ratingModel.findByIdAndDelete(id).exec();
  }

  async removeAll() {
    return await this.ratingModel.remove().exec();
  }
  private async isRatingDuplicated(raterId: ObjectId, designId: ObjectId) {
    return (
      (
        await this.ratingModel
          .find({
            $and: [{ raterId }, { designId }],
          })
          .exec()
      ).length > 0
    );
  }
}
