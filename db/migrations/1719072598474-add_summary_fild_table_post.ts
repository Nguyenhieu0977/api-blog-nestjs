import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSummaryFildTablePost1719072598474 implements MigrationInterface {
    name = 'AddSummaryFildTablePost1719072598474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`summary\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`summary\``);
    }

}
