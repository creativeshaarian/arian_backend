import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class HeroCtaFields1746550000000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
