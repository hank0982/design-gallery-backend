import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { UpdateRatingDto } from './dtos/update-rating.dto';
import { ApiTags } from '@nestjs/swagger';
import { Query } from '@nestjs/common';
import { RatingQueryDto } from './dtos/rating-query.dto';
@ApiTags('Rating')
@Controller('api/ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async create(@Body() createRatingDto: CreateRatingDto) {
    try {
      const newRating = await this.ratingService.create(createRatingDto);
      return newRating;
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async findAll(@Query() ratingQueryDto: RatingQueryDto) {
    return await this.ratingService.findAll(ratingQueryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ratingService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return await this.ratingService.update(id, updateRatingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ratingService.remove(id);
  }

  @Delete()
  async removeAll() {
    return await this.ratingService.removeAll();
  }
}
