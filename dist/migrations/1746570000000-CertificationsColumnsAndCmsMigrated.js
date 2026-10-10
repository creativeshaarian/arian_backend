"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationsColumnsAndCmsMigrated1746570000000 = void 0;
class CertificationsColumnsAndCmsMigrated1746570000000 {
    constructor() {
        this.name = 'CertificationsColumnsAndCmsMigrated1746570000000';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS certifications (
        id CHAR(36) NOT NULL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date VARCHAR(64) NOT NULL,
        image TEXT NULL,
        image_alt VARCHAR(255) NULL,
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(32) NOT NULL DEFAULT 'published',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
        const subtitle = await queryRunner.query(`
      SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'certifications'
        AND COLUMN_NAME = 'subtitle'
    `);
        if (Number(subtitle[0]?.cnt ?? 0) === 0) {
            await queryRunner.query(`
        ALTER TABLE certifications
        ADD COLUMN subtitle VARCHAR(255) NULL AFTER title
      `);
        }
        const credential = await queryRunner.query(`
      SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'certifications'
        AND COLUMN_NAME = 'credential_url'
    `);
        if (Number(credential[0]?.cnt ?? 0) === 0) {
            await queryRunner.query(`
        ALTER TABLE certifications
        ADD COLUMN credential_url TEXT NULL AFTER image_alt
      `);
        }
        const flag = await queryRunner.query(`
      SELECT COUNT(*) AS cnt FROM site_settings WHERE \`key\` = 'cms_migrated'
    `);
        if (Number(flag[0]?.cnt ?? 0) === 0) {
            const hero = await queryRunner.query(`SELECT COUNT(*) AS cnt FROM hero_settings`);
            if (Number(hero[0]?.cnt ?? 0) > 0) {
                await queryRunner.query(`
          INSERT INTO site_settings (id, \`key\`, value, updated_at)
          VALUES (UUID(), 'cms_migrated', JSON_OBJECT('migratedAt', NOW(), 'version', 2, 'source', 'migration'), NOW(6))
        `);
            }
        }
    }
    async down(queryRunner) {
        const subtitle = await queryRunner.query(`
      SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'certifications'
        AND COLUMN_NAME = 'subtitle'
    `);
        if (Number(subtitle[0]?.cnt ?? 0) > 0) {
            await queryRunner.query(`ALTER TABLE certifications DROP COLUMN subtitle`);
        }
        const credential = await queryRunner.query(`
      SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'certifications'
        AND COLUMN_NAME = 'credential_url'
    `);
        if (Number(credential[0]?.cnt ?? 0) > 0) {
            await queryRunner.query(`ALTER TABLE certifications DROP COLUMN credential_url`);
        }
    }
}
exports.CertificationsColumnsAndCmsMigrated1746570000000 = CertificationsColumnsAndCmsMigrated1746570000000;
//# sourceMappingURL=1746570000000-CertificationsColumnsAndCmsMigrated.js.map