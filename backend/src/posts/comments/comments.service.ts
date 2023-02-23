import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(postId: number, userId: number, commentData: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data: {
        ...commentData,
        author: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
      include: {
        author: true,
      },
    });

    return comment;
  }
}
