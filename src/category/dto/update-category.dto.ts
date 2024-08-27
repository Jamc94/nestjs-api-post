import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateCategoryDto {
    @ApiPropertyOptional({
        description: 'Name of the category',
        maxLength: 50,
        example: 'Updated Technology',
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    name?: string;

    @ApiPropertyOptional({
        description: 'List of post IDs associated with the category',
        type: [String],
        example: ['post1', 'post3'],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    posts?: string[];
}