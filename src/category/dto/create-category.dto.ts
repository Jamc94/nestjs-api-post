import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Name of the category',
        maxLength: 50,
        example: 'Technology',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiPropertyOptional({
        description: 'List of post IDs associated with the category',
        type: [String],
        example: ['post1', 'post2'],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    posts?: string[];
}