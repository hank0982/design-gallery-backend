import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";
import { PaginationQueryDto } from "src/common-dtos/pagination-query.dto";
import { ObjectId } from 'mongoose';

export class FeedbackQueryDto extends PaginationQueryDto {
    @ApiPropertyOptional()
    @IsMongoId()
    @IsOptional()
    designId: ObjectId;

    @ApiPropertyOptional()
    @IsOptional()
    @IsMongoId()
    feedbackProviderId: ObjectId;
}