import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been created.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({ type: CreateUserDto })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateUserDto): Promise<User> {
        try {
            return await this.userService.create(data);
        } catch (error) {
            this.handleException(error);
        }
    }
    
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users' })
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<User[]> {
        try {
            return await this.userService.findAll();
        } catch (error) {
            this.handleException(error);
        }
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'Return a user' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiParam({ name: 'id', type: String })
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<User> {
        try {
            return await this.userService.findOne(id);
        } catch (error) {
            this.handleException(error);
        }
    }
    
    @Patch(':id')
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiResponse({ status: 200, description: 'The user has been updated' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiParam({ name: 'id', description: 'The ID of the user to update', type: String })
    @ApiBody({ type: UpdateUserDto })
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
        try {
            return await this.userService.update(id, data);
        } catch (error) {
            this.handleException(error);
        }
    }
    

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiResponse({ status: 200, description: 'The user has been deleted' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiParam({ name: 'id', description: 'The ID of the user to delete', type: String })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string): Promise<void> {
        try {
            await this.userService.remove(id);
        } catch (error) {
            this.handleException(error);
        }
    }
    
    private handleException(error: unknown): never {
        if (error instanceof NotFoundException) throw error;
        throw new HttpException((error as Error).message ?? 'Unknown error', HttpStatus.BAD_REQUEST);
    }

}
