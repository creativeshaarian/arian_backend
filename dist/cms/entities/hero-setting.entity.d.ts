export declare class HeroSetting {
    id: string;
    greeting?: string;
    name?: string;
    marqueeName?: string;
    profileImage?: string;
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
    updatedAt: Date;
}
