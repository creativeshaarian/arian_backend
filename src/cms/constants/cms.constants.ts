export const SECTION_VISIBILITY_KEY = 'section_visibility';
export const SECTION_ORDER_KEY = 'section_order';

/** Default homepage main-section order (navbar stays fixed outside this list) */
export const DEFAULT_SECTION_ORDER: string[] = [
  'hero',
  'about',
  'projects',
  'experience',
  'stack',
  'services',
  'certifications',
  'blog',
  'footer',
];

export const DEFAULT_SECTION_VISIBILITY: Record<string, boolean> = {
  hero: true,
  about: true,
  services: true,
  stack: true,
  experience: true,
  certifications: true,
  testimonials: true,
  projects: true,
  blog: true,
  contact: true,
  footer: true,
};

export const CONTENT_SECTION_MAP: Record<string, string[]> = {
  hero: ['hero', 'skills', 'socialLinks'],
  about: ['about'],
  services: ['services'],
  stack: ['stack', 'skills'],
  experience: ['experience'],
  certifications: ['certifications'],
  testimonials: ['testimonials'],
  projects: ['projects'],
  blog: ['blogPosts', 'blogCategories'],
  contact: ['footer'],
  footer: ['footer'],
  navbar: ['navbar', 'navLinks', 'navUtilityLinks'],
};

export type MediaEntityType =
  | 'navbar'
  | 'hero'
  | 'about'
  | 'project'
  | 'blog'
  | 'service'
  | 'experience'
  | 'testimonial'
  | 'certification'
  | 'footer'
  | 'stack'
  | 'social';

export type MediaFieldRole =
  | 'logo'
  | 'profile'
  | 'cover'
  | 'gallery'
  | 'icon'
  | 'avatar'
  | 'hover'
  | 'shape'
  | 'background'
  | 'image';
