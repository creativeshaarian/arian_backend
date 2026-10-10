import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogService } from './blog.service';
import { BlogCategoryService } from './blog-category.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import {
  CreateBlogCategoryDto,
  UpdateBlogCategoryDto,
} from './dto/blog-category.dto';

@Controller('admin/blog')
@UseGuards(JwtAuthGuard)
export class BlogAdminController {
  constructor(
    private readonly blogService: BlogService,
    private readonly categoryService: BlogCategoryService,
  ) {}

  @Get('categories')
  findCategories() {
    return this.categoryService.findAll(true);
  }

  @Post('categories')
  createCategory(@Body() dto: CreateBlogCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Put('categories/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateBlogCategoryDto,
  ) {
    return this.categoryService.update(id, dto);
  }

  @Delete('categories/:id')
  removeCategory(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @Get()
  findAll() {
    return this.blogService.findAll(true);
  }

  @Get('posts/:id')
  async findOne(@Param('id') id: string) {
    return this.blogService.findEntityById(id);
  }

  @Post('posts')
  create(@Body() dto: CreateBlogPostDto) {
    return this.blogService.create(dto);
  }

  @Put('posts/:id')
  update(@Param('id') id: string, @Body() dto: UpdateBlogPostDto) {
    return this.blogService.update(id, dto);
  }

  @Delete('posts/:id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
