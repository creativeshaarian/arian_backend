import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * - social_links: custom uploaded icon (SVG/image)
 * - navbar_items: placement main | utility for custom right-side links
 */
export class SocialIconsAndNavbarPlacement1746580000000
  implements MigrationInterface
{
  name = 'SocialIconsAndNavbarPlacement1746580000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    const iconMedia = await queryRunner.query(`
      SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'social_links'
        AND COLUMN_NAME = 'icon_media_id'
    `);
    if (Number(iconMedia[0]?.cnt ?? 0) > 0) {
      await queryRunner.query(
        `ALTER TABLE social_links DROP COLUMN icon_media_id`,
      );
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
      await queryRunner.query(
        `ALTER TABLE navbar_items DROP COLUMN placement`,
      );
    }
  }
}
