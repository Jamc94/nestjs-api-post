import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDto): Promise<User> {
        try {
            return await this.prisma.user.create({ data, include: { profile: true, posts: true } });
        } catch (error) {
            this.handleError(error, ``, 'Error creating User');
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.prisma.user.findMany({ include: { profile: true, posts: true } });
        } catch (error) {
            this.handleError(error, ``, 'Error fetching User');
        }
    }

    async findOne(id: string): Promise<User> {
        try {
            const user = await this.prisma.user.findUnique({ where: { id }, include: { profile: true, posts: true } });
            if(!user) throw new NotFoundException(`User with ID ${id} not found`);
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            this.handleError(error, ``, 'Error fetching User by ID');
        }
    }

    async update(id: string, data: UpdateUserDto): Promise<User> {
        try {
            return await this.prisma.user.update({ where: { id }, data });
        } catch (error) {
            this.handleError(error, `User with ID ${id} not found to update`, 'Error updating User');
        }
    }

    async remove(id: string): Promise<User> {
        try {
            return await this.prisma.user.delete({ where: { id } });
        } catch (error) {
            this.handleError(error, `User with ID ${id} not found to update`, 'Error deleting User');
        }
    }

    private handleError(error: unknown, notFound: string, serverError: string): never {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new NotFoundException(notFound);
        }
        throw new InternalServerErrorException(serverError);
    }

}
