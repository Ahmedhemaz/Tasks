import { createQueryBuilder, getConnection } from 'typeorm';
import { Injectable } from "@nestjs/common";

import { ITasksTypeRepository } from "../interfaces/ITasksTypeRepository";
import { TasksTypeDataModel } from "../models/type-name.dataModel";
import { ImageDataModel } from '../models/image.dataModel';

@Injectable()
export class TasksTypeRepository implements ITasksTypeRepository {

    getTypeById(typeId: number): TasksTypeDataModel {
        throw new Error("Method not implemented.");
    }

    async getTypeByName(name: string): Promise<TasksTypeDataModel> {
        return await createQueryBuilder(TasksTypeDataModel, "task_type")
            .leftJoinAndMapOne("task_type.image", ImageDataModel, "task_type_images", "task_type_images.task_type_id = task_type.id")
            .where("task_type.name like :name", { name: `%${name}%` })
            .take(1)
            .getOne();
    }

    async getTypesByName(name: string): Promise<TasksTypeDataModel[]> {
        return await createQueryBuilder(TasksTypeDataModel, "task_type")
            .leftJoinAndMapOne("task_type.image", ImageDataModel, "task_type_images", "task_type_images.task_type_id = task_type.id")
            .where("task_type.name like :name", { name: `%${name}%` })
            .take(5)
            .getMany();
    }

    async create(taskType: TasksTypeDataModel): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(TasksTypeDataModel)
            .values(taskType)
            .execute();
    }

    async createWithImage(taskType: TasksTypeDataModel, imageDataModel: ImageDataModel): Promise<void> {
        imageDataModel.tasksType = taskType;
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();

        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(taskType);
            await queryRunner.manager.save(imageDataModel);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    update(taskType: TasksTypeDataModel): void {
        throw new Error("Method not implemented.");
    }

    delete(typeId: number): void {
        throw new Error("Method not implemented.");
    }

}