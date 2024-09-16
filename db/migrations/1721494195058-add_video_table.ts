import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVideoTable1721494195058 implements MigrationInterface {
    name = 'AddVideoTable1721494195058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`video\` DROP FOREIGN KEY \`FK_74e27b13f8ac66f999400df12f6\``);
        await queryRunner.query(`ALTER TABLE \`video\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`video\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`video\` DROP COLUMN \`summary\``);
        await queryRunner.query(`ALTER TABLE \`video\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`video\` ADD \`summary\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`video\` ADD \`description\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`video\` ADD \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`video\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`video\` ADD CONSTRAINT \`FK_74e27b13f8ac66f999400df12f6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`video\` DROP FOREIGN KEY \`FK_74e27b13f8ac66f999400df12f6\``);
        await queryRunner.query(`ALTER TABLE \`video\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`video\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`video\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`video\` DROP COLUMN \`summary\``);
        await queryRunner.query(`ALTER TABLE \`video\` ADD \`description\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`video\` ADD \`summary\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`video\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`video\` ADD \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`video\` ADD CONSTRAINT \`FK_74e27b13f8ac66f999400df12f6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
