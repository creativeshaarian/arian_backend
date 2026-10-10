"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialIconsAndNavbarPlacement1746580000000 = void 0;
class SocialIconsAndNavbarPlacement1746580000000 {
    constructor() {
        this.name = 'SocialIconsAndNavbarPlacement1746580000000';
    }
    async up(queryRunner) {
        const iconUrl = await queryRunner.query(`
      SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'social_links'
        AND COLUMN_NAME = 'icon_url'
    `);
        if (Number(iconUrl[0]?.cnt ?? 0) === 0) {
            await queryRunner.query(`
        ALTER TABLE social_links
        ADD COLUMN icon_url TEXT NULL AFTER platform
      `);
        }
        const iconMedia = await queryRunner.query(`
      SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'social_links'
        AND COLUMN_NAME = 'icon_media_id'
    `);
        if (Number(iconMedia[0]?.cnt ?? 0) === 0) {
            await queryRunner.query(`
        ALTER TABLE social_links
        ADD COLUMN icon_media_id CHAR(36) NULL AFTER icon_url
      `);
        }
        const placement = await queryRunner.query(`
      SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'navbar_items'
        AND COLUMN_NAME = 'placement'
    `);
        if (Number(placement[0]?.cnt ?? 0) === 0) {
            await queryRunner.query(`
        ALTER TABLE navbar_items
        ADD COLUMN placement VARCHAR(32) NOT NULL DEFAULT 'main' AFTER href
      `);
        }
    }
    async down(queryRunner) {
        const iconMedia = await queryRunner.query(`
      SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'social_links'
        AND COLUMN_NAME = 'icon_media_id'
    `);
        if (Number(iconMedia[0]?.cnt ?? 0) > 0) {
            await queryRunner.query(`ALTER TABLE social_links DROP COLUMN icon_media_id`);
        }
        const iconUrl = await queryRunner.query(`
      SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'social_links'
        AND COLUMN_NAME = 'icon_url'
    `);
        if (Number(iconUrl[0]?.cnt ?? 0) > 0) {
            await queryRunner.query(`ALTER TABLE social_links DROP COLUMN icon_url`);
        }
        const placement = await queryRunner.query(`
      SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'navbar_items'
        AND COLUMN_NAME = 'placement'
    `);
        if (Number(placement[0]?.cnt ?? 0) > 0) {
            await queryRunner.query(`ALTER TABLE navbar_items DROP COLUMN placement`);
        }
    }
}
exports.SocialIconsAndNavbarPlacement1746580000000 = SocialIconsAndNavbarPlacement1746580000000;
//# sourceMappingURL=1746580000000-SocialIconsAndNavbarPlacement.js.map