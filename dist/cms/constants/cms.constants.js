"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENT_SECTION_MAP = exports.DEFAULT_SECTION_VISIBILITY = exports.DEFAULT_SECTION_ORDER = exports.SECTION_ORDER_KEY = exports.SECTION_VISIBILITY_KEY = void 0;
exports.SECTION_VISIBILITY_KEY = 'section_visibility';
exports.SECTION_ORDER_KEY = 'section_order';
exports.DEFAULT_SECTION_ORDER = [
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
exports.DEFAULT_SECTION_VISIBILITY = {
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
exports.CONTENT_SECTION_MAP = {
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
//# sourceMappingURL=cms.constants.js.map