"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const site_setting_entity_1 = require("../cms/entities/site-setting.entity");
const cms_constants_1 = require("../cms/constants/cms.constants");
let SettingsService = class SettingsService {
    constructor(siteSettingRepo) {
        this.siteSettingRepo = siteSettingRepo;
    }
    async upsertByKey(key, value) {
        const existing = await this.siteSettingRepo.findOne({ where: { key } });
        if (existing) {
            existing.value = value;
            return this.siteSettingRepo.save(existing);
        }
        return this.siteSettingRepo.save(this.siteSettingRepo.create({ key, value }));
    }
    async getSiteMeta() {
        const site = await this.siteSettingRepo.findOne({ where: { key: 'site' } });
        return (site?.value ?? {
            title: '',
            description: '',
            frontendTheme: 'light',
        });
    }
    async updateSiteMeta(value) {
        const current = await this.getSiteMeta();
        const next = {
            ...current,
            ...value,
        };
        await this.upsertByKey('site', next);
        return next;
    }
    async getSectionVisibility() {
        const row = await this.siteSettingRepo.findOne({
            where: { key: cms_constants_1.SECTION_VISIBILITY_KEY },
        });
        return {
            ...cms_constants_1.DEFAULT_SECTION_VISIBILITY,
            ...(row?.value ?? {}),
        };
    }
    async getSectionOrder() {
        const row = await this.siteSettingRepo.findOne({
            where: { key: cms_constants_1.SECTION_ORDER_KEY },
        });
        const stored = row?.value;
        if (Array.isArray(stored) && stored.every((x) => typeof x === 'string')) {
            const known = new Set(stored);
            const merged = [...stored];
            for (const key of cms_constants_1.DEFAULT_SECTION_ORDER) {
                if (!known.has(key))
                    merged.push(key);
            }
            return merged;
        }
        return [...cms_constants_1.DEFAULT_SECTION_ORDER];
    }
    async updateSectionVisibility(sections, order) {
        const current = await this.getSectionVisibility();
        const merged = { ...current, ...sections };
        await this.upsertByKey(cms_constants_1.SECTION_VISIBILITY_KEY, merged);
        let nextOrder = await this.getSectionOrder();
        if (Array.isArray(order) && order.length) {
            const cleaned = order.filter((k) => typeof k === 'string' && k.trim());
            if (cleaned.length) {
                await this.upsertByKey(cms_constants_1.SECTION_ORDER_KEY, cleaned);
                nextOrder = cleaned;
            }
        }
        return { sections: merged, order: nextOrder };
    }
    async getPublicSettings() {
        const [site, sections, order] = await Promise.all([
            this.getSiteMeta(),
            this.getSectionVisibility(),
            this.getSectionOrder(),
        ]);
        return { site, sections, order };
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(site_setting_entity_1.SiteSetting)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingsService);
//# sourceMappingURL=settings.service.js.map