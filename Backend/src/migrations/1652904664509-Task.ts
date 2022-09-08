

import {MigrationInterface, QueryRunner} from "typeorm";

export class Task1652904664509 implements MigrationInterface {
    name = 'Task1652904664509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`descriptition\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`description\` varchar(2000) NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`descriptition\` varchar(2000) NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`id\` int NOT NULL PRIMARY KEY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`descriptition\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`description\` varchar(2000) NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`descriptition\` varchar(2000) NULL`);
    }

}
