import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Category successfully created.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
    @ApiBody({ type: CreateCategoryDto })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateCategoryDto): Promise<Category> {
        try {
            return await this.categoryService.create(data);
        } catch (error) {
            this.handleException(error);
        }
    }
    
    @Get()
    @ApiOperation({ summary: 'Retrieve all categories' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved categories.' })
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Category[]> {
        try {
            return await this.categoryService.findAll();
        } catch (error) {
            this.handleException(error);
        }
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a category by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved category.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Category not found.' })
    @ApiParam({ name: 'id', description: 'Category ID', type: String })
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<Category> {
        try {
            return await this.categoryService.findOne(id);
        } catch (error) {
            this.handleException(error);
        }
    }
    
    @Patch(':id')
    @ApiOperation({ summary: 'Update a category by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Successfully updated category.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Category not found.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
    @ApiParam({ name: 'id', description: 'Category ID', type: String })
    @ApiBody({ type: UpdateCategoryDto })
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() data: UpdateCategoryDto): Promise<Category> {
        try {
            return await this.categoryService.update(id, data);
        } catch (error) {
            this.handleException(error);
        }
    }
    

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category by ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Successfully deleted category.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Category not found.' })
    @ApiParam({ name: 'id', description: 'Category ID', type: String })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string): Promise<void> {
        try {
            await this.categoryService.remove(id);
        } catch (error) {
            this.handleException(error);
        }
    }
    
    private handleException(error: unknown): never {
        if (error instanceof NotFoundException) throw error;
        throw new HttpException((error as Error).message ?? 'Unknown error', HttpStatus.BAD_REQUEST);
    }

}
