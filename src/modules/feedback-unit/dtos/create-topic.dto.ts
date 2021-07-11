import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTopicDto {
  @ApiProperty({type: String})
  @IsString()
  topic: string;
}
