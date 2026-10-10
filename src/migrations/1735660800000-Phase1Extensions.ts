import { MigrationInterface, QueryRunner } from 'typeorm';

export class Phase1Extensions1735660800000 implements MigrationInterface {
  name = 'Phase1Extensions1735660800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS media_assets (
        id CHAR(36) NOT NULL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        mime_type VARCHAR(128) NOT NULL,
        size INT NOT NULL DEFAULT 0,
        alt VARCHAR(255) NULL,
        folder VARCHAR(64) NULL,
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS blog_categories (
        id VARCHAR(64) NOT NULL PRIMARY KEY,
        label VARCHAR(128) NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(32) NOT NULL DEFAULT 'published',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    const projectColumns: Array<{ name: string; sql: string }> = [
      {
        name: 'github_url',
        sql: 'ALTER TABLE projects ADD COLUMN github_url TEXT NULL',
      },
      {
        name: 'live_url',
        sql: 'ALTER TABLE projects ADD COLUMN live_url TEXT NULL',
      },
      {
        name: 'featured',
        sql: 'ALTER TABLE projects ADD COLUMN featured TINYINT(1) NOT NULL DEFAULT 0',
      },
      {
        name: 'technologies',
        sql: 'ALTER TABLE projects ADD COLUMN technologies JSON NULL',
      },
      {
        name: 'status',
        sql: "ALTER TABLE projects ADD COLUMN status VARCHAR(32) NOT NULL DEFAULT 'published'",
      },
    ];

    for (const col of projectColumns) {
      const exists = await queryRunner.query(
        `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'projects' AND COLUMN_NAME = ?`,
        [col.name],
      );
      if (Number(exists[0]?.cnt ?? 0) === 0) {
        await queryRunner.query(col.sql);
      }
    }

    const blogColumns: Array<{ name: string; sql: string }> = [
      {
        name: 'status',
        sql: "ALTER TABLE blog_posts ADD COLUMN status VARCHAR(32) NOT NULL DEFAULT 'published'",
      },
    ];

    for (const col of blogColumns) {
      const exists = await queryRunner.query(
        `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'blog_posts' AND COLUMN_NAME = ?`,
        [col.name],
      );
      if (Number(exists[0]?.cnt ?? 0) === 0) {
        await queryRunner.query(col.sql);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS media_assets`);
    await queryRunner.query(`DROP TABLE IF EXISTS blog_categories`);

    const dropProjectCols = [
      'github_url',
      'live_url',
      'featured',
      'technologies',
      'status',
    ];
    for (const col of dropProjectCols) {
      const exists = await queryRunner.query(
        `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'projects' AND COLUMN_NAME = ?`,
        [col],
      );
      if (Number(exists[0]?.cnt ?? 0) > 0) {
        await queryRunner.query(`ALTER TABLE projects DROP COLUMN ${col}`);
      }
    }

    const exists = await queryRunner.query(
      `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'blog_posts' AND COLUMN_NAME = 'status'`,
    );
    if (Number(exists[0]?.cnt ?? 0) > 0) {
      await queryRunner.query(`ALTER TABLE blog_posts DROP COLUMN status`);
    }
  }
}
