export type SiteContent = Record<string, unknown>;

export const CONTENT_SECTIONS = [
  'site',
  'hero',
  'about',
  'navbar',
  'navLinks',
  'navUtilityLinks',
  'skills',
  'socialLinks',
  'stack',
  'services',
  'projects',
  'blogPosts',
  'blogCategories',
  'experience',
  'certifications',
  'testimonials',
  'footer',
  'pricingPlans',
  'sectionVisibility',
  'sectionOrder',
] as const;

export type ContentSectionKey = (typeof CONTENT_SECTIONS)[number];

export function isContentSectionKey(key: string): key is ContentSectionKey {
  return (CONTENT_SECTIONS as readonly string[]).includes(key);
}
