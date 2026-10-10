import { Controller, Get, Param } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogCategoryService } from './blog-category.service';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly categoryService: BlogCategoryService,
  ) {}

  @Get('categories')
  findCategories() {
    return this.categoryService.findAll();
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }
}
