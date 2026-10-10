"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phase2Normalization1735664400000 = void 0;
class Phase2Normalization1735664400000 {
    constructor() {
        this.name = 'Phase2Normalization1735664400000';
    }
    async up(queryRunner) {
        const tables = [
            `CREATE TABLE IF NOT EXISTS site_settings (
        id CHAR(36) NOT NULL PRIMARY KEY,
        \`key\` VARCHAR(64) NOT NULL UNIQUE,
        value JSON NOT NULL,
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS navbar_settings (
        id CHAR(36) NOT NULL PRIMARY KEY,
        logo_image TEXT NULL,
        logo_text VARCHAR(128) NULL,
        cta_text VARCHAR(128) NULL,
        cta_href TEXT NULL,
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS navbar_items (
        id CHAR(36) NOT NULL PRIMARY KEY,
        label VARCHAR(128) NOT NULL,
        href TEXT NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(32) NOT NULL DEFAULT 'published',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS hero_settings (
        id CHAR(36) NOT NULL PRIMARY KEY,
        greeting VARCHAR(128) NULL,
        name VARCHAR(255) NULL,
        marquee_name VARCHAR(255) NULL,
        profile_image TEXT NULL,
        profile_alt VARCHAR(255) NULL,
        cta_text VARCHAR(128) NULL,
        cta_href TEXT NULL,
        background_images JSON NULL,
        floating_images JSON NULL,
        badges JSON NULL,
        statistics JSON NULL,
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS about_settings (
        id CHAR(36) NOT NULL PRIMARY KEY,
        heading VARCHAR(255) NULL,
        text TEXT NULL,
        profile_image TEXT NULL,
        experience_years INT NULL,
        features JSON NULL,
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS services (
        id CHAR(36) NOT NULL PRIMARY KEY,
        number VARCHAR(16) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        shape_image TEXT NULL,
        shape_alt VARCHAR(255) NULL,
        rotate INT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(32) NOT NULL DEFAULT 'published',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS stack_items (
        id CHAR(36) NOT NULL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NULL,
        category VARCHAR(64) NULL,
        progress INT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(32) NOT NULL DEFAULT 'published',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS skills (
        id CHAR(36) NOT NULL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(32) NOT NULL DEFAULT 'published',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS experience_items (
        id CHAR(36) NOT NULL PRIMARY KEY,
        slug VARCHAR(128) NULL,
        duration VARCHAR(64) NOT NULL,
        position VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        logo_image TEXT NULL,
        hover_image TEXT NULL,
        hover_image_alt VARCHAR(255) NULL,
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(32) NOT NULL DEFAULT 'published',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS project_images (
        id CHAR(36) NOT NULL PRIMARY KEY,
        project_id VARCHAR(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
        url TEXT NOT NULL,
        alt VARCHAR(255) NULL,
        type VARCHAR(32) NOT NULL DEFAULT 'gallery',
        sort_order INT NOT NULL DEFAULT 0,
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        INDEX idx_project_images_project (project_id),
        CONSTRAINT fk_project_images_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS social_links (
        id CHAR(36) NOT NULL PRIMARY KEY,
        label VARCHAR(128) NOT NULL,
        href TEXT NOT NULL,
        platform VARCHAR(32) NOT NULL,
        location VARCHAR(32) NOT NULL DEFAULT 'hero',
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(32) NOT NULL DEFAULT 'published',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS contact_settings (
        id CHAR(36) NOT NULL PRIMARY KEY,
        email VARCHAR(255) NULL,
        phone VARCHAR(64) NULL,
        address TEXT NULL,
        phone_href VARCHAR(64) NULL,
        email_href VARCHAR(255) NULL,
        form_settings JSON NULL,
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS footer_settings (
        id CHAR(36) NOT NULL PRIMARY KEY,
        title VARCHAR(255) NULL,
        description TEXT NULL,
        image_url TEXT NULL,
        image_alt VARCHAR(255) NULL,
        copyright VARCHAR(255) NULL,
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS footer_nav_links (
        id CHAR(36) NOT NULL PRIMARY KEY,
        label VARCHAR(128) NOT NULL,
        href TEXT NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(32) NOT NULL DEFAULT 'published',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS testimonials (
        id CHAR(36) NOT NULL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        role VARCHAR(255) NOT NULL,
        quote TEXT NOT NULL,
        avatar TEXT NULL,
        rating INT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(32) NOT NULL DEFAULT 'published',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
            `CREATE TABLE IF NOT EXISTS pricing_plans (
        id CHAR(36) NOT NULL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        tagline VARCHAR(255) NOT NULL,
        price VARCHAR(64) NOT NULL,
        featured TINYINT(1) NOT NULL DEFAULT 0,
        features JSON NULL,
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(32) NOT NULL DEFAULT 'published',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
        ];
        for (const sql of tables) {
            await queryRunner.query(sql);
        }
    }
    async down(queryRunner) {
        const tables = [
            'pricing_plans',
            'testimonials',
            'footer_nav_links',
            'footer_settings',
            'contact_settings',
            'social_links',
            'project_images',
            'experience_items',
            'skills',
            'stack_items',
            'services',
            'about_settings',
            'hero_settings',
            'navbar_items',
            'navbar_settings',
            'site_settings',
        ];
        for (const table of tables) {
            await queryRunner.query(`DROP TABLE IF EXISTS ${table}`);
        }
    }
}
exports.Phase2Normalization1735664400000 = Phase2Normalization1735664400000;
//# sourceMappingURL=1735664400000-Phase2Normalization.js.map