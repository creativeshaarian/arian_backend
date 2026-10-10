import { BlogPost } from '../../blog/entities/blog-post.entity';
import { BlogCategory } from '../../blog/entities/blog-category.entity';
import type { ArticleContent } from '../types/article.types';
export type CmsBlogPost = {
    id: string;
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
};
export type CmsBlogPostDetail = CmsBlogPost & {
    article?: ArticleContent | null;
};
export declare function serializeBlogPost(post: BlogPost): CmsBlogPost;
export declare function serializeBlogPostDetail(post: BlogPost): CmsBlogPostDetail;
export declare function serializeBlogCategory(category: BlogCategory): {
    id: string;
    label: string;
};
