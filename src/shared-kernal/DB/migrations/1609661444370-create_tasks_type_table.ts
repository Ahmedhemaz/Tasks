import { MigrationInterface, QueryRunner } from "typeorm";

export class createTasksTypeTable1609661444370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const createTasksTypeTableQuery: string = `CREATE TABLE IF NOT EXISTS tasks_type (
            id VARCHAR(36) UNIQUE NOT NULL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )  ENGINE=INNODB;`;
        await queryRunner.query(createTasksTypeTableQuery);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
