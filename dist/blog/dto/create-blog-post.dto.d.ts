export declare class CreateBlogPostDto {
    title: string;
    slug?: string;
    titleAccent?: string;
    excerpt: string;
    category: string;
    categoryLabel: string;
    author: string;
    readingTime: string;
    date: string;
    dateISO: string;
    image: string;
    imageMediaId?: string;
    imageAlt: string;
    article?: Record<string, unknown>;
    status?: 'published' | 'draft';
    sortOrder?: number;
}
export declare class UpdateBlogPostDto extends CreateBlogPostDto {
}
