import { MigrationInterface, QueryRunner } from 'typeorm';

export class Phase2Completion1735668000000 implements MigrationInterface {
  name = 'Phase2Completion1735668000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS media_relations (
        id CHAR(36) NOT NULL PRIMARY KEY,
        media_id CHAR(36) NOT NULL,
        entity_type VARCHAR(32) NOT NULL,
        entity_id VARCHAR(36) NOT NULL,
        field VARCHAR(32) NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        INDEX idx_media_relations_entity (entity_type, entity_id),
        INDEX idx_media_relations_field (entity_type, entity_id, field),
        CONSTRAINT fk_media_relations_media FOREIGN KEY (media_id) REFERENCES media_assets(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    const projectImageCols = [
      {
        name: 'media_id',
        sql: 'ALTER TABLE project_images ADD COLUMN media_id CHAR(36) NULL',
      },
    ];

    for (const col of projectImageCols) {
      const exists = await queryRunner.query(
        `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'project_images' AND COLUMN_NAME = ?`,
        [col.name],
      );
      if (Number(exists[0]?.cnt ?? 0) === 0) {
        await queryRunner.query(col.sql);
      }
    }

    const fkExists = await queryRunner.query(
      `SELECT COUNT(*) AS cnt FROM information_schema.TABLE_CONSTRAINTS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'project_images' AND CONSTRAINT_NAME = 'fk_project_images_media'`,
    );
    if (Number(fkExists[0]?.cnt ?? 0) === 0) {
      await queryRunner.query(`
        ALTER TABLE project_images
        ADD CONSTRAINT fk_project_images_media
        FOREIGN KEY (media_id) REFERENCES media_assets(id) ON DELETE SET NULL
      `);
    }

    const mediaCols = [
      { table: 'hero_settings', col: 'profile_media_id' },
      { table: 'navbar_settings', col: 'logo_media_id' },
      { table: 'about_settings', col: 'profile_media_id' },
      { table: 'footer_settings', col: 'image_media_id' },
      { table: 'services', col: 'shape_media_id' },
      { table: 'stack_items', col: 'icon_media_id' },
      { table: 'experience_items', col: 'logo_media_id' },
      { table: 'experience_items', col: 'hover_media_id' },
      { table: 'testimonials', col: 'avatar_media_id' },
      { table: 'blog_posts', col: 'image_media_id' },
      { table: 'projects', col: 'cover_media_id' },
    ];

    for (const { table, col } of mediaCols) {
      const exists = await queryRunner.query(
        `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
        [table, col],
      );
      if (Number(exists[0]?.cnt ?? 0) === 0) {
        await queryRunner.query(
          `ALTER TABLE ${table} ADD COLUMN ${col} CHAR(36) NULL`,
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS media_relations`);

    const tables = [
      'hero_settings',
      'navbar_settings',
      'about_settings',
      'footer_settings',
      'services',
      'stack_items',
      'experience_items',
      'testimonials',
      'blog_posts',
      'projects',
    ];

    for (const table of tables) {
      const cols = await queryRunner.query(
        `SELECT COLUMN_NAME FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME LIKE '%_media_id'`,
        [table],
      );
      for (const row of cols) {
        await queryRunner.query(
          `ALTER TABLE ${table} DROP COLUMN ${row.COLUMN_NAME}`,
        );
      }
    }

    const fkExists = await queryRunner.query(
      `SELECT COUNT(*) AS cnt FROM information_schema.TABLE_CONSTRAINTS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'project_images' AND CONSTRAINT_NAME = 'fk_project_images_media'`,
    );
    if (Number(fkExists[0]?.cnt ?? 0) > 0) {
      await queryRunner.query(
        `ALTER TABLE project_images DROP FOREIGN KEY fk_project_images_media`,
      );
    }

    const mediaIdExists = await queryRunner.query(
      `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'project_images' AND COLUMN_NAME = 'media_id'`,
    );
    if (Number(mediaIdExists[0]?.cnt ?? 0) > 0) {
      await queryRunner.query(`ALTER TABLE project_images DROP COLUMN media_id`);
    }
  }
}
