"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeBlogPost = serializeBlogPost;
exports.serializeBlogPostDetail = serializeBlogPostDetail;
exports.serializeBlogCategory = serializeBlogCategory;
function serializeBlogPost(post) {
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
        dateISO: typeof post.dateISO === 'string'
            ? post.dateISO.slice(0, 10)
            : new Date(post.dateISO).toISOString().slice(0, 10),
        image: post.image,
        imageAlt: post.imageAlt,
    };
}
function serializeBlogPostDetail(post) {
    return {
        ...serializeBlogPost(post),
        article: post.article ?? null,
    };
}
function serializeBlogCategory(category) {
    return {
        id: category.id,
        label: category.label,
    };
}
//# sourceMappingURL=blog.serializer.js.map