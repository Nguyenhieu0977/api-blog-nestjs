import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNestedCategoryTable1719671324203 implements MigrationInterface {
    name = 'AddNestedCategoryTable1719671324203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`parentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_d5456fd7e4c4866fec8ada1fa10\` FOREIGN KEY (\`parentId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_d5456fd7e4c4866fec8ada1fa10\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`parentId\``);
    }

}
