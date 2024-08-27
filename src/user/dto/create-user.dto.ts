import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: 'The user email', example: 'ricardo@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The user name', example: 'Ricardo Martínez' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @Matches(/^[a-zA-ZñÑáéíóúüÁÉÍÓÚÜ]+$/)
    name: string;

    @ApiProperty({ description: 'The user role', example: 'admin', enum: ['admin', 'user', 'guest'] })
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @IsIn(['admin', 'user', 'guest'])
    role: string;
}