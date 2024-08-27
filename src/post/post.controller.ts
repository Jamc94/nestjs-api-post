import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel} from '@prisma/client';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Post successfully created.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
    @ApiBody({ type: CreatePostDto })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreatePostDto): Promise<PostModel> {
        try {
            return await this.postService.create(data);
        } catch (error) {
            this.handleException(error);
        }
    }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Retrieve all posts' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved posts.' })
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<PostModel[]> {
        try {
            return await this.postService.findAll();
        } catch (error) {
            this.handleException(error);
        }
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a post by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved post.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found.' })
    @ApiParam({ name: 'id', description: 'Post ID', type: String })
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<PostModel> {
        try {
            return await this.postService.findOne(id);
        } catch (error) {
            this.handleException(error);
        }
    }
    
    @Patch(':id')
    @ApiOperation({ summary: 'Update a post by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Successfully updated post.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
    @ApiParam({ name: 'id', description: 'Post ID', type: String })
    @ApiBody({ type: UpdatePostDto })
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() data: UpdatePostDto): Promise<PostModel> {
        try {
            return await this.postService.update(id, data);
        } catch (error) {
            this.handleException(error);
        }
    }
    

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a post by ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Successfully deleted post.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found.' })
    @ApiParam({ name: 'id', description: 'Post ID', type: String })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string): Promise<void> {
        try {
            await this.postService.remove(id);
        } catch (error) {
            this.handleException(error);
        }
    }
    
    private handleException(error: unknown): never {
        if (error instanceof NotFoundException) throw error;
        throw new HttpException((error as Error).message ?? 'Unknown error', HttpStatus.BAD_REQUEST);
    }

}
