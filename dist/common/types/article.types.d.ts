export type ArticleBlock = {
    type: 'h2';
    text: string;
    id?: string;
} | {
    type: 'h3';
    text: string;
    id?: string;
} | {
    type: 'p';
    text: string;
} | {
    type: 'ul';
    items: string[];
} | {
    type: 'ol';
    items: string[];
} | {
    type: 'blockquote';
    text: string;
} | {
    type: 'takeaways';
    items: string[];
} | {
    type: 'image';
    src: string;
    alt: string;
    caption?: string;
} | {
    type: 'code';
    code: string;
    language?: string;
} | {
    type: 'divider';
} | {
    type: 'table';
    headers: string[];
    rows: string[][];
};
export type ArticleAuthor = {
    name: string;
    bio: string;
    avatar: string;
    role?: string;
    socials?: {
        label: string;
        href: string;
    }[];
};
export type ArticleContent = {
    slug: string;
    subtitle?: string;
    readingMinutes: number;
    author: ArticleAuthor;
    blocks: ArticleBlock[];
    faq?: {
        question: string;
        answer: string;
    }[];
};
