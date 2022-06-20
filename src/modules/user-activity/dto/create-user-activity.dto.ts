import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateUserActivityDto {
    @ApiProperty({ type: String })
    @IsMongoId()
    userId: ObjectId;
}

