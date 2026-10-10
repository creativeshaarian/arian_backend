import { Repository } from 'typeorm';
import { BlogCategory } from './entities/blog-category.entity';
import { CreateBlogCategoryDto, UpdateBlogCategoryDto } from './dto/blog-category.dto';
export declare class BlogCategoryService {
    private readonly repo;
    constructor(repo: Repository<BlogCategory>);
    findAll(includeDrafts?: boolean): Promise<{
        id: string;
        label: string;
    }[]>;
    findEntityById(id: string): Promise<BlogCategory>;
    create(dto: CreateBlogCategoryDto): Promise<{
        id: string;
        label: string;
    }>;
    update(id: string, dto: UpdateBlogCategoryDto): Promise<{
        id: string;
        label: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    syncFromContent(items: Array<{
        id: string;
        label: string;
    }>): Promise<void>;
}
