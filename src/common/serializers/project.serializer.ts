import { Project } from '../../projects/entities/project.entity';
import { ProjectImage } from '../../cms/entities/project-image.entity';

export type CmsProject = {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  duration: string;
  image: string;
  gallery: string[];
  heroBackground?: string;
  heroLayout?: 'full' | 'container';
  previewHref: string;
  ctaHref: string;
  ctaLabel: string;
  summary: string;
  content: Array<{ type: string; text: string }>;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  technologies?: string[];
};

export type CmsProjectDetail = CmsProject & {
  description: string;
  coverImage: string;
  galleryImages: string[];
};

export function serializeProject(project: Project): CmsProject {
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

export function serializeProjectDetail(
  project: Project,
  images?: ProjectImage[],
): CmsProjectDetail {
  const base = serializeProject(project);
  const galleryImages =
    images && images.length > 0
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
