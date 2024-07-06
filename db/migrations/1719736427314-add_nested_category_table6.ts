import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNestedCategoryTable61719736427314 implements MigrationInterface {
    name = 'AddNestedCategoryTable61719736427314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`nsleft\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`nsright\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`nsright\` int NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`nsleft\` int NOT NULL DEFAULT '1'`);
    }

}
