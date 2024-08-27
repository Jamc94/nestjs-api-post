import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateProfileDto {
    @ApiProperty({
        description: 'Biography of the user',
        maxLength: 500,
        example: 'A short biography about the user',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    bio: string;

    @ApiProperty({
        description: 'ID of the user',
        example: 'd0f8f0b1-9f00-4b22-b641-44699a84b1d3',
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;
}