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

export function serializeBlogPost(post: BlogPost): CmsBlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    titleAccent: post.titleAccent,
    excerpt: post.excerpt,
    category: post.category,
    categoryLabel: post.categoryLabel,
    author: post.author,
    readingTime: post.readingTime,
    date: post.date,
    dateISO:
      typeof post.dateISO === 'string'
        ? post.dateISO.slice(0, 10)
        : new Date(post.dateISO).toISOString().slice(0, 10),
    image: post.image,
    imageAlt: post.imageAlt,
  };
}

export function serializeBlogPostDetail(post: BlogPost): CmsBlogPostDetail {
  return {
    ...serializeBlogPost(post),
    article: (post.article as ArticleContent | null) ?? null,
  };
}

export function serializeBlogCategory(category: BlogCategory) {
  return {
    id: category.id,
    label: category.label,
  };
}
