export declare class UpdateNavbarSettingsDto {
    logoImage?: string;
    logoMediaId?: string;
    logoText?: string;
    ctaText?: string;
    ctaHref?: string;
}
export declare class CreateNavbarItemDto {
    label: string;
    href: string;
    placement?: 'main' | 'utility';
    sortOrder?: number;
    status?: string;
}
export declare class UpdateNavbarItemDto {
    label?: string;
    href?: string;
    placement?: 'main' | 'utility';
    sortOrder?: number;
    status?: string;
}
export declare class UpdateHeroDto {
    greeting?: string;
    name?: string;
    marqueeName?: string;
    profileImage?: string;
    profileMediaId?: string;
    profileAlt?: string;
    ctaText?: string;
    ctaHref?: string;
    ctaIcon?: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    backgroundImages?: string[];
    floatingImages?: string[];
    badges?: string[];
    statistics?: Array<{
        label: string;
        value: string;
    }>;
}
export declare class UpdateAboutDto {
    heading?: string;
    text?: string;
    profileImage?: string;
    profileMediaId?: string;
    experienceYears?: number;
    features?: Array<{
        title: string;
        description: string;
        icon?: string;
    }>;
}
export declare class CreateServiceItemDto {
    number: string;
    title: string;
    description: string;
    shapeImage?: string;
    shapeMediaId?: string;
    shapeAlt?: string;
    rotate?: number;
    sortOrder?: number;
    status?: string;
}
export declare class UpdateServiceItemDto extends CreateServiceItemDto {
}
export declare class CreateStackItemDto {
    name: string;
    description: string;
    icon?: string;
    iconMediaId?: string;
    category?: string;
    progress?: number;
    sortOrder?: number;
    status?: string;
}
export declare class UpdateStackItemDto extends CreateStackItemDto {
}
export declare class CreateSkillItemDto {
    name: string;
    sortOrder?: number;
    status?: string;
}
export declare class UpdateSkillItemDto extends CreateSkillItemDto {
}
export declare class CreateExperienceItemDto {
    slug?: string;
    duration: string;
    position: string;
    company: string;
    description: string;
    logoImage?: string;
    logoMediaId?: string;
    hoverImage?: string;
    hoverMediaId?: string;
    hoverImageAlt?: string;
    sortOrder?: number;
    status?: string;
}
export declare class UpdateExperienceItemDto extends CreateExperienceItemDto {
}
export declare class UpdateExperienceMetaDto {
    cvHref: string;
}
export declare class CreateSocialLinkDto {
    label: string;
    href: string;
    platform?: string;
    iconUrl?: string;
    iconMediaId?: string;
    location?: 'hero' | 'footer';
    sortOrder?: number;
    status?: string;
}
export declare class UpdateSocialLinkDto {
    label?: string;
    href?: string;
    platform?: string;
    iconUrl?: string;
    iconMediaId?: string;
    location?: 'hero' | 'footer';
    sortOrder?: number;
    status?: string;
}
export declare class UpdateContactDto {
    email?: string;
    phone?: string;
    address?: string;
    phoneHref?: string;
    emailHref?: string;
    formSettings?: Record<string, unknown>;
}
export declare class UpdateFooterDto {
    title?: string;
    description?: string;
    imageUrl?: string;
    imageMediaId?: string;
    imageAlt?: string;
    copyright?: string;
}
export declare class CreateFooterNavLinkDto {
    label: string;
    href: string;
    sortOrder?: number;
    status?: string;
}
export declare class UpdateFooterNavLinkDto extends CreateFooterNavLinkDto {
}
export declare class CreateTestimonialDto {
    name: string;
    role: string;
    quote: string;
    avatar?: string;
    avatarMediaId?: string;
    rating?: number;
    sortOrder?: number;
    status?: string;
}
export declare class UpdateTestimonialDto extends CreateTestimonialDto {
}
export declare class CreateCertificationDto {
    title: string;
    subtitle?: string;
    description: string;
    date: string;
    image?: string;
    imageMediaId?: string;
    imageAlt?: string;
    credentialUrl?: string;
    sortOrder?: number;
    status?: string;
}
export declare class UpdateCertificationDto extends CreateCertificationDto {
}
export declare class CreatePricingPlanDto {
    name: string;
    tagline: string;
    price: string;
    featured?: boolean;
    features?: string[];
    sortOrder?: number;
    status?: string;
}
export declare class UpdatePricingPlanDto extends CreatePricingPlanDto {
}
export declare class AddProjectImageDto {
    url?: string;
    mediaId?: string;
    alt?: string;
    type?: 'cover' | 'gallery' | 'hero';
    sortOrder?: number;
}
