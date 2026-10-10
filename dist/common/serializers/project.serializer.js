"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeProject = serializeProject;
exports.serializeProjectDetail = serializeProjectDetail;
function serializeProject(project) {
    return {
        id: project.id,
        slug: project.slug,
        title: project.title,
        category: project.category,
        client: project.client,
        duration: project.duration,
        image: project.image,
        gallery: project.gallery ?? [],
        heroBackground: project.heroBackground,
        heroLayout: project.heroLayout,
        previewHref: project.previewHref,
        ctaHref: project.ctaHref,
        ctaLabel: project.ctaLabel,
        summary: project.summary,
        content: project.content ?? [],
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        featured: project.featured,
        technologies: project.technologies ?? [],
    };
}
function serializeProjectDetail(project, images) {
    const base = serializeProject(project);
    const galleryImages = images && images.length > 0
        ? images
            .filter((img) => img.type === 'gallery' || img.type === 'cover')
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((img) => img.url)
        : base.gallery;
    return {
        ...base,
        gallery: galleryImages.length ? galleryImages : base.gallery,
        description: project.summary,
        coverImage: project.image,
        galleryImages: galleryImages.length ? galleryImages : base.gallery,
    };
}
//# sourceMappingURL=project.serializer.js.map