import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RequestWithUser from 'src/auth/request-with-user.interface';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: RequestWithUser,
    @Param('postId') postId: string,
    @Body() commentData: CreateCommentDto,
  ) {
    const comment = await this.commentsService.create(
      +postId,
      req.user.id,
      commentData,
    );
    return {
      status: 'success',
      data: comment,
    };
  }
}
