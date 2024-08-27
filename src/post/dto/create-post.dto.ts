import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreatePostDto {
    @ApiProperty({
        description: 'Title of the post',
        minLength: 2,
        maxLength: 100,
        example: 'My First Post',
    })
    @IsNotEmpty()
    @IsString()
    @Length(2,100)
    title: string;

    @ApiPropertyOptional({
        description: 'Publication status of the post',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @ApiProperty({
        description: 'Author ID of the post',
        example: 'd0f8f0b1-9f00-4b22-b641-44699a84b1d3',
    })
    @IsNotEmpty()
    @IsUUID()
    authorId: string;

    @ApiPropertyOptional({
        description: 'List of category IDs associated with the post',
        type: [String],
        example: ['category1', 'category2'],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    categories?: string[];
}