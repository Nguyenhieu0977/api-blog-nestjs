import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNestedCategoryTable1719672791519 implements MigrationInterface {
    name = 'AddNestedCategoryTable1719672791519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_d5456fd7e4c4866fec8ada1fa10\``);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`parentId\` \`parentCategoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_9e5435ba76dbc1f1a0705d4db43\` FOREIGN KEY (\`parentCategoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_9e5435ba76dbc1f1a0705d4db43\``);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`parentCategoryId\` \`parentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_d5456fd7e4c4866fec8ada1fa10\` FOREIGN KEY (\`parentId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
