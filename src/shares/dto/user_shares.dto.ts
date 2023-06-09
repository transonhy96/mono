import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUrl } from "class-validator";

export class FilterShareDto {
    url?: string
}

export class CreateShareDto {

    @IsNotEmpty()
    @IsUrl()
    @ApiProperty({ required: true })
    url: string

    @IsNumber()
    @ApiProperty({ required: true })
    user_id: number
}