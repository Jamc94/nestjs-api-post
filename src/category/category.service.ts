import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateCategoryDto): Promise<Category> {
        try {
            return await this.prisma.category.create({ 
                data: {
                    name: data.name,
                    posts: { connect: data.posts?.map(id => ({ id })) }
                },
                include: { posts: true } 
            });
        } catch (error) {
            this.handleError(error, ``, 'Error creating Category');
        }
    }

    async findAll(): Promise<Category[]> {
        try {
            return await this.prisma.category.findMany({ include: { posts: true } });
        } catch (error) {
            this.handleError(error, ``, 'Error fetching Category');
        }
    }

    async findOne(id: string): Promise<Category> {
        try {
            const category = await this.prisma.category.findUnique({ where: { id }, include: { posts: true } });
            if(!category) throw new NotFoundException(`Category with ID ${id} not found`);
            return category;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            this.handleError(error, ``, 'Error fetching Category by ID');
        }
    }

    async update(id: string, data: UpdateCategoryDto): Promise<Category> {
        try {
            return await this.prisma.category.update({ 
                where: { id }, 
                data: {
                    name: data.name,
                    posts: { set: data.posts?.map(id => ({ id })) }
                } 
            });
        } catch (error) {
            this.handleError(error, `Category with ID ${id} not found to update`, 'Error updating Category');
        }
    }

    async remove(id: string): Promise<Category> {
        try {
            return await this.prisma.category.delete({ where: { id } });
        } catch (error) {
            this.handleError(error, `Category with ID ${id} not found to update`, 'Error deleting Category');
        }
    }

    private handleError(error: unknown, notFound: string, serverError: string): never {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new NotFoundException(notFound);
        }
        throw new InternalServerErrorException(serverError);
    }

}
