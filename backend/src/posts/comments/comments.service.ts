import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async remove(postId: number, userId: number, id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        post: true,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    if (comment.author.id !== userId) {
      throw new UnauthorizedException(
        `You don't have permission to delete this comment`,
      );
    }

    if (comment.post.id !== postId) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    return this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
