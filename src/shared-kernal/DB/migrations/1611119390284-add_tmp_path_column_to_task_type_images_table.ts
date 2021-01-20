import { MigrationInterface, QueryRunner } from "typeorm";

export class addTmpPathColumnToTaskTypeImagesTable1611119390284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const addTmpPathColumnQuery = `ALTER TABLE task_type_images ADD COLUMN temp_path VARCHAR(500) NOT NULL;`;
        await queryRunner.query(addTmpPathColumnQuery);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
