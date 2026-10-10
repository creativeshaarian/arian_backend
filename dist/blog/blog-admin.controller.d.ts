import { BlogService } from './blog.service';
import { BlogCategoryService } from './blog-category.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { CreateBlogCategoryDto, UpdateBlogCategoryDto } from './dto/blog-category.dto';
export declare class BlogAdminController {
    private readonly blogService;
    private readonly categoryService;
    constructor(blogService: BlogService, categoryService: BlogCategoryService);
    findCategories(): Promise<{
        id: string;
        label: string;
    }[]>;
    createCategory(dto: CreateBlogCategoryDto): Promise<{
        id: string;
        label: string;
    }>;
    updateCategory(id: string, dto: UpdateBlogCategoryDto): Promise<{
        id: string;
        label: string;
    }>;
    removeCategory(id: string): Promise<{
        success: boolean;
    }>;
    findAll(): Promise<import("../common/serializers/blog.serializer").CmsBlogPost[]>;
    findOne(id: string): Promise<import("./entities/blog-post.entity").BlogPost>;
    create(dto: CreateBlogPostDto): Promise<import("../common/serializers/blog.serializer").CmsBlogPostDetail>;
    update(id: string, dto: UpdateBlogPostDto): Promise<import("../common/serializers/blog.serializer").CmsBlogPostDetail>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
