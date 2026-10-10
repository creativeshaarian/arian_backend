import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
type BlogInput = {
    id?: string;
    slug: string;
    title: string;
    titleAccent?: string;
    excerpt: string;
    category: string;
    categoryLabel: string;
    author: string;
    readingTime: string;
    date: string;
    dateISO: string;
    image: string;
    imageAlt: string;
    article?: unknown;
    status?: string;
};
import { MediaRelationService } from '../media/media-relation.service';
export declare class BlogService {
    private readonly repo;
    private readonly mediaRelationService;
    constructor(repo: Repository<BlogPost>, mediaRelationService: MediaRelationService);
    findAll(includeDrafts?: boolean): Promise<import("../common/serializers/blog.serializer").CmsBlogPost[]>;
    findAllForCms(): Promise<import("../common/serializers/blog.serializer").CmsBlogPost[]>;
    findBySlug(slug: string): Promise<import("../common/serializers/blog.serializer").CmsBlogPostDetail>;
    findEntityById(id: string): Promise<BlogPost>;
    create(dto: CreateBlogPostDto): Promise<import("../common/serializers/blog.serializer").CmsBlogPostDetail>;
    update(id: string, dto: UpdateBlogPostDto): Promise<import("../common/serializers/blog.serializer").CmsBlogPostDetail>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    syncFromContent(items: BlogInput[]): Promise<void>;
}
export {};
