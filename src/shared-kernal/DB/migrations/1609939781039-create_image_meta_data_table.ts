import { MigrationInterface, QueryRunner } from "typeorm";

export class createImageMetaDataTable1609939781039 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const createImageMetaDataTableQuery = `CREATE TABLE IF NOT EXISTS task_type_images(
            id VARCHAR(36) UNIQUE NOT NULL PRIMARY KEY,
            url VARCHAR(2083) NOT NULL,
            original_name VARCHAR(500) NOT NULL,
            mime_type VARCHAR(100) NOT NULL,
            task_type_id VARCHAR(36) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (task_type_id) REFERENCES tasks_type(id)
            ON DELETE CASCADE       
        ) ENGINE=INNODB;`;
        await queryRunner.query(createImageMetaDataTableQuery);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
