import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @AuthUser('id') userId: number,
    @Body() postData: CreatePostDto,
  ) {
    const post = await this.postsService.create(postData, userId);
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
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postsService.findOne(id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    return {
      status: 'success',
      data: post,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @AuthUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() postData: UpdatePostDto,
  ) {
    const post = await this.postsService.findOne(id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    // Only the owner of the post can update it
    if (post.authorId !== userId) {
      throw new UnauthorizedException(
        `You don't have permission to update this post`,
      );
    }

    const updatedPost = await this.postsService.update(id, postData);
    return {
      status: 'success',
      data: updatedPost,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @AuthUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const post = await this.postsService.findOne(id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    // Only the owner of the post can delete it
    if (post.authorId !== userId) {
      throw new UnauthorizedException(
        `You don't have permission to delete this post`,
      );
    }

    await this.postsService.remove(id);
    return {
      status: 'success',
      data: null,
    };
  }
}
