"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroCtaFields1746550000000 = void 0;
class HeroCtaFields1746550000000 {
    constructor() {
        this.name = 'HeroCtaFields1746550000000';
    }
    async up(queryRunner) {
        const cols = [
            {
                name: 'cta_icon',
                sql: "ALTER TABLE hero_settings ADD COLUMN cta_icon VARCHAR(512) NULL",
            },
            {
                name: 'secondary_cta_text',
                sql: "ALTER TABLE hero_settings ADD COLUMN secondary_cta_text VARCHAR(128) NULL",
            },
            {
                name: 'secondary_cta_href',
                sql: 'ALTER TABLE hero_settings ADD COLUMN secondary_cta_href TEXT NULL',
            },
        ];
        for (const col of cols) {
            const exists = await queryRunner.query(`SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'hero_settings' AND COLUMN_NAME = ?`, [col.name]);
            if (Number(exists[0]?.cnt ?? 0) === 0) {
                await queryRunner.query(col.sql);
            }
        }
    }
    async down(queryRunner) {
        for (const name of ['secondary_cta_href', 'secondary_cta_text', 'cta_icon']) {
            const exists = await queryRunner.query(`SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'hero_settings' AND COLUMN_NAME = ?`, [name]);
            if (Number(exists[0]?.cnt ?? 0) > 0) {
                await queryRunner.query(`ALTER TABLE hero_settings DROP COLUMN ${name}`);
            }
        }
    }
}
exports.HeroCtaFields1746550000000 = HeroCtaFields1746550000000;
//# sourceMappingURL=1746550000000-HeroCtaFields.js.map