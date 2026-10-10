import { BlogService } from './blog.service';
import { BlogCategoryService } from './blog-category.service';
export declare class BlogController {
    private readonly blogService;
    private readonly categoryService;
    constructor(blogService: BlogService, categoryService: BlogCategoryService);
    findCategories(): Promise<{
        id: string;
        label: string;
    }[]>;
    findAll(): Promise<import("../common/serializers/blog.serializer").CmsBlogPost[]>;
    findOne(slug: string): Promise<import("../common/serializers/blog.serializer").CmsBlogPostDetail>;
}
