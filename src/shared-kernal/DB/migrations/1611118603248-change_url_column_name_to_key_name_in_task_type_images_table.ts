import { MigrationInterface, QueryRunner } from "typeorm";

export class changeUrlColumnNameToKeyNameInTaskTypeImagesTable1611118603248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const changeUrlColumnNameToKeyNameQuery = `ALTER TABLE task_type_images CHANGE url key_name VARCHAR(2083) NOT NULL;`;
        await queryRunner.query(changeUrlColumnNameToKeyNameQuery);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
