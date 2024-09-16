import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVideoTableUpdate1721494294244 implements MigrationInterface {
    name = 'AddVideoTableUpdate1721494294244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`video\` DROP COLUMN \`summary\``);
        await queryRunner.query(`ALTER TABLE \`video\` DROP COLUMN \`description\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`video\` ADD \`description\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`video\` ADD \`summary\` varchar(255) NOT NULL`);
    }

}
