import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from '@prisma/client';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('profiles')
@ApiTags('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new profile' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Profile successfully created.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
    @ApiBody({ type: CreateProfileDto })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateProfileDto): Promise<Profile> {
        try {
            return await this.profileService.create(data);
        } catch (error) {
            this.handleException(error);
        }
    }
    
    @Get()
    @ApiOperation({ summary: 'Retrieve all profiles' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved profiles.' })
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Profile[]> {
        try {
            return await this.profileService.findAll();
        } catch (error) {
            this.handleException(error);
        }
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a profile by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved profile.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Profile not found.' })
    @ApiParam({ name: 'id', description: 'Profile ID', type: String })
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<Profile> {
        try {
            return await this.profileService.findOne(id);
        } catch (error) {
            this.handleException(error);
        }
    }
    
    @Patch(':id')
    @ApiOperation({ summary: 'Update a profile by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Successfully updated profile.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Profile not found.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
    @ApiParam({ name: 'id', description: 'Profile ID', type: String })
    @ApiBody({ type: UpdateProfileDto })
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() data: UpdateProfileDto): Promise<Profile> {
        try {
            return await this.profileService.update(id, data);
        } catch (error) {
            this.handleException(error);
        }
    }
    

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a profile by ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Successfully deleted profile.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Profile not found.' })
    @ApiParam({ name: 'id', description: 'Profile ID', type: String })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string): Promise<void> {
        try {
            await this.profileService.remove(id);
        } catch (error) {
            this.handleException(error);
        }
    }
    
    private handleException(error: unknown): never {
        if (error instanceof NotFoundException) throw error;
        throw new HttpException((error as Error).message ?? 'Unknown error', HttpStatus.BAD_REQUEST);
    }

}
