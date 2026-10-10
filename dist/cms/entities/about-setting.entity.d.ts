export declare class AboutSetting {
    id: string;
    heading?: string;
    text?: string;
    profileImage?: string;
    experienceYears?: number;
    features?: Array<{
        title: string;
        description: string;
        icon?: string;
    }>;
    updatedAt: Date;
}
