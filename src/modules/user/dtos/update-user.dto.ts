import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional()
    @IsArray()
    @IsMongoId({each: true})
    projectIds: ObjectId[];

    @ApiPropertyOptional()
    @IsArray()
    @IsMongoId({each: true})
    ratingIds: ObjectId[];
  
    @ApiPropertyOptional()
    @IsArray()
    @IsMongoId({each: true})
    feedbackUnitIds: ObjectId[];
}
