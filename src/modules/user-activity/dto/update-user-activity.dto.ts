import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
import { CreateUserActivityDto } from './create-user-activity.dto';

export class UpdateUserActivityDto {
    @ApiProperty({ type: String })
    @IsMongoId()
    userId: ObjectId;

    @ApiProperty()
    logs: any[];
}