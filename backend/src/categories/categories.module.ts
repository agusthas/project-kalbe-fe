import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  providers: [CategoriesService, PrismaService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
