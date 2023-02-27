import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage/storage.service';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {}

  async create(postData: CreatePostDto, userId: number) {
    if (postData.image) {
      postData.image = (
        await this.storageService.downloadFile(postData.image)
      ).path;
    }

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
            avatar: true,
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
                avatar: true,
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
    if (postData.image) {
      postData.image = (
        await this.storageService.downloadFile(postData.image)
      ).path;
    }

    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: postData,
    });

    return updatedPost;
  }

  async remove(id: number) {
    const post = await this.prisma.post.delete({
      where: { id },
    });
    return post;
  }
}
