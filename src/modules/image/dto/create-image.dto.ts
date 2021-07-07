import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateImageDto {
    @ApiProperty()
    @IsString()
    originalFileName: string;

    @ApiProperty()
    @IsString()
    newFileName: string;

    @ApiProperty()
    @IsString()
    path: string;

    @ApiProperty()
    @IsString()
    uuid: string;

    @ApiProperty()
    @IsNumber()
    size: number;
}
