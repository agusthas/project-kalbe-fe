import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RequestWithUser from 'src/auth/request-with-user.interface';
import { CreatePostDto } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: RequestWithUser,
    @Body() postData: CreatePostDto,
  ) {
    const post = await this.postsService.create(postData, req.user.id);
    return {
      status: 'success',
      data: post,
    };
  }

  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();
    return {
      status: 'success',
      data: posts,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(+id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    return {
      status: 'success',
      data: post,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() postData: CreatePostDto,
  ) {
    const post = await this.postsService.findOne(+id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    // Only the owner of the post can update it
    if (post.authorId !== req.user.id) {
      throw new UnauthorizedException(
        `You don't have permission to update this post`,
      );
    }

    const updatedPost = await this.postsService.update(+id, postData);
    return {
      status: 'success',
      data: updatedPost,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req: RequestWithUser, @Param('id') id: string) {
    const post = await this.postsService.findOne(+id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    // Only the owner of the post can delete it
    if (post.authorId !== req.user.id) {
      throw new UnauthorizedException(
        `You don't have permission to delete this post`,
      );
    }

    await this.postsService.remove(+id);
    return {
      status: 'success',
      data: null,
    };
  }
}
