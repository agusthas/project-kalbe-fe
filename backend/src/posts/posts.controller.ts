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

  @Put(':id')
  async update(@Param('id') id: string, @Body() postData: CreatePostDto) {
    const post = await this.postsService.findOne(+id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    const updatedPost = await this.postsService.update(+id, postData);
    return {
      status: 'success',
      data: updatedPost,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const post = await this.postsService.findOne(+id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    await this.postsService.remove(+id);
    return {
      status: 'success',
      data: null,
    };
  }
}
