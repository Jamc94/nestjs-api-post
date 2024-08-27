import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from '@prisma/client';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateProfileDto): Promise<Profile> {
        try {
            return await this.prisma.profile.create({ data, include: { user: true } });
        } catch (error) {
            this.handleError(error, ``, 'Error creating Profile');
        }
    }

    async findAll(): Promise<Profile[]> {
        try {
            return await this.prisma.profile.findMany({ include: { user: true } });
        } catch (error) {
            this.handleError(error, ``, 'Error fetching Profile1');
        }
    }

    async findOne(id: string): Promise<Profile> {
        try {
            const profile = await this.prisma.profile.findUnique({ where: { id }, include: { user: true } });
            if(!profile) throw new NotFoundException(`Profile with ID ${id} not found`);
            return profile;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            this.handleError(error, ``, 'Error fetching Profile by ID');
        }
    }

    async update(id: string, data: UpdateProfileDto): Promise<Profile> {
        try {
            return await this.prisma.profile.update({ where: { id }, data });
        } catch (error) {
            this.handleError(error, `Profile with ID ${id} not found to update`, 'Error updating Profile');
        }
    }

    async remove(id: string): Promise<Profile> {
        try {
            return await this.prisma.profile.delete({ where: { id } });
        } catch (error) {
            this.handleError(error, `Profile with ID ${id} not found to update`, 'Error deleting Profile');
        }
    }

    private handleError(error: unknown, notFound: string, serverError: string): never {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new NotFoundException(notFound);
        }
        throw new InternalServerErrorException(serverError);
    }

}
