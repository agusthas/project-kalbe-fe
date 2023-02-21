import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return {
      status: 'success',
      data: categories,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(+id);
    if (!category)
      throw new NotFoundException(`Category with ID ${id} not found`);

    return {
      status: 'success',
      data: category,
    };
  }
}
