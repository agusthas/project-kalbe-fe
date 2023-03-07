import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @AuthUser('id') userId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() commentData: CreateCommentDto,
  ) {
    const comment = await this.commentsService.create(
      postId,
      userId,
      commentData,
    );
    return {
      status: 'success',
      data: comment,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @AuthUser('id') userId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const comment = await this.commentsService.remove(postId, userId, id);
    return {
      status: 'success',
      data: comment,
    };
  }
}
