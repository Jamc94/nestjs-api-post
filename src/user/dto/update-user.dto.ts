import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, Matches, MaxLength } from "class-validator";

export class UpdateUserDto {
    @ApiPropertyOptional({ description: 'Email of the user', example: 'ricardo@example.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ description: 'Name of the user', example: 'Ricardo Martínez' })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    @Matches(/^[a-zA-ZñÑáéíóúüÁÉÍÓÚÜ]+$/)
    name?: string;

    @ApiPropertyOptional({ description: 'Role of the user', example: 'admin', enum: ['admin', 'user', 'guest'] })
    @IsOptional()
    @IsString()
    @MaxLength(20)
    @IsIn(['admin', 'user', 'guest'])
    role?: string;
}