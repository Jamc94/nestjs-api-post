import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class UpdatePostDto {
    @ApiPropertyOptional({
        description: 'Title of the post',
        minLength: 2,
        maxLength: 100,
        example: 'Updated Post Title',
    })
    @IsOptional()
    @IsString()
    @Length(2,100)
    title?: string;

    @ApiPropertyOptional({
        description: 'Publication status of the post',
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @ApiPropertyOptional({
        description: 'Author ID of the post',
        example: 'd0f8f0b1-9f00-4b22-b641-44699a84b1d3',
    })
    @IsOptional()
    @IsUUID()
    authorId?: string;

    @ApiPropertyOptional({
        description: 'List of category IDs associated with the post',
        type: [String],
        example: ['category1', 'category3'],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    categories?: string[];
}