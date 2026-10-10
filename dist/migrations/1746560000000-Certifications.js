"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Certifications1746560000000 = void 0;
class Certifications1746560000000 {
    constructor() {
        this.name = 'Certifications1746560000000';
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
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS certifications`);
    }
}
exports.Certifications1746560000000 = Certifications1746560000000;
//# sourceMappingURL=1746560000000-Certifications.js.map