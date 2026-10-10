import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class Phase1Extensions1735660800000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
