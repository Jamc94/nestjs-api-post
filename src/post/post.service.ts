import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from '@prisma/client';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreatePostDto): Promise<Post> {
        try {
            const {categories, ...rest} = data
            return await this.prisma.post.create({ 
                data: {
                    ...rest,
                    categories: { connect: categories?.map(id => ({ id })) }
                },
                include: { author: true, categories: true }
            });
        } catch (error) {
            this.handleError(error, ``, 'Error creating Post');
        }
    }

    async findAll(): Promise<Post[]> {
        try {
            return await this.prisma.post.findMany({ include: { author: true, categories: true } });
        } catch (error) {
            this.handleError(error, ``, 'Error fetching Post');
        }
    }

    async findOne(id: string): Promise<Post> {
        try {
            const post = await this.prisma.post.findUnique({ where: { id }, include: { author: true, categories: true } });
            if(!post) throw new NotFoundException(`post with ID ${id} not found`);
            return post;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            this.handleError(error, ``, 'Error fetching Post by ID');
        }
    }

    async update(id: string, data: UpdatePostDto): Promise<Post> {
        try {
            const {categories, ...rest} = data
            return await this.prisma.post.update({ 
                where: { id }, 
                data: {
                    ...rest,
                    categories: { set: categories?.map(id => ({ id })) }
                },
                include: { author: true, categories: true } 
            });
        } catch (error) {
            this.handleError(error, `Post with ID ${id} not found to update`, 'Error updating Post');
        }
    }

    async remove(id: string): Promise<Post> {
        try {
            return await this.prisma.post.delete({ where: { id } });
        } catch (error) {
            this.handleError(error, `Post with ID ${id} not found to update`, 'Error deleting Post');
        }
    }

    private handleError(error: unknown, notFound: string, serverError: string): never {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new NotFoundException(notFound);
        }
        throw new InternalServerErrorException(serverError);
    }

}
