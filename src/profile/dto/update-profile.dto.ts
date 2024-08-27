import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class UpdateProfileDto {
    @ApiPropertyOptional({
        description: 'Biography of the user',
        maxLength: 500,
        example: 'An updated short biography about the user',
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    bio?: string;

    @ApiPropertyOptional({
        description: 'ID of the user',
        example: 'd0f8f0b1-9f00-4b22-b641-44699a84b1d3',
    })
    @IsOptional()
    @IsUUID()
    userId?: string;
}