import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ISurveyInfo } from 'src/schemas/user.schema';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  username: string;

  surveyInfo?: ISurveyInfo;
}
