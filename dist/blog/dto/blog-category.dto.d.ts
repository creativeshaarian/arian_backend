export declare class CreateBlogCategoryDto {
    id: string;
    label: string;
    sortOrder?: number;
    status?: 'published' | 'draft';
}
export declare class UpdateBlogCategoryDto {
    label?: string;
    sortOrder?: number;
    status?: 'published' | 'draft';
}
