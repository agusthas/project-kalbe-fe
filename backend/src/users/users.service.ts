import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: userData,
    });

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async getById(id: number, options?: { withRelations: boolean }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: options?.withRelations
        ? {
            posts: {
              include: {
                category: true,
                comments: true,
              },
            },
            comments: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    avatar: true,
                  },
                },
              },
            },
            _count: true,
          }
        : undefined,
    });

    return user;
  }

  async update(userId: number, userData: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: userData,
      include: { posts: true, comments: true, _count: true },
    });

    return user;
  }
}
