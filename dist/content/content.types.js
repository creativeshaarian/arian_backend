"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENT_SECTIONS = void 0;
exports.isContentSectionKey = isContentSectionKey;
exports.CONTENT_SECTIONS = [
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
];
function isContentSectionKey(key) {
    return exports.CONTENT_SECTIONS.includes(key);
}
//# sourceMappingURL=content.types.js.map