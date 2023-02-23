import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(postData: CreatePostDto, userId: number) {
    const post = await this.prisma.post.create({
      data: {
        title: postData.title,
        description: postData.description,
        image: postData.image,
        author: {
          connect: { id: userId },
        },
        category: {
          connect: { id: postData.categoryId },
        },
      },
    });

    return post;
  }

  async findAll() {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        category: true,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return post;
  }

  async update(id: number, postData: UpdatePostDto) {
    const post = await this.prisma.post.update({
      where: { id },
      data: postData,
    });

    return post;
  }

  async remove(id: number) {
    const post = await this.prisma.post.delete({
      where: { id },
    });
    return post;
  }
}
