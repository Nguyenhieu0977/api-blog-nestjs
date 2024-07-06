import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNestedCategoryTable51719675831370 implements MigrationInterface {
    name = 'AddNestedCategoryTable51719675831370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`nsleft\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`nsright\` int NOT NULL DEFAULT '2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`nsright\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`nsleft\``);
    }

}
