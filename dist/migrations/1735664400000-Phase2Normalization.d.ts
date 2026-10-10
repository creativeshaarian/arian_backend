import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class Phase2Normalization1735664400000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
