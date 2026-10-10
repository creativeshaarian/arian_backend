import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { BlogCategory } from './entities/blog-category.entity';
import { BlogService } from './blog.service';
import { BlogCategoryService } from './blog-category.service';
import { BlogController } from './blog.controller';
import { BlogAdminController } from './blog-admin.controller';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogPost, BlogCategory]),
    MediaModule,
  ],
  controllers: [BlogController, BlogAdminController],
  providers: [BlogService, BlogCategoryService],
  exports: [BlogService, BlogCategoryService],
})
export class BlogModule {}
