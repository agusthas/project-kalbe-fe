import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CommentsModule } from './comments/comments.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
  imports: [CommentsModule],
})
export class PostsModule {}
