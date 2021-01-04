import { getConnection } from 'typeorm';
import { Injectable } from "@nestjs/common";

import { ITasksTypeRepository } from "../interfaces/ITasksTypeRepository";
import { TasksTypeDataModel } from "../models/type-name.entity";

@Injectable()
export class TasksTypeRepository implements ITasksTypeRepository {

    getTypeById(typeId: number): TasksTypeDataModel {
        throw new Error("Method not implemented.");
    }

    getTypeByName(typeName: string): TasksTypeDataModel {
        throw new Error("Method not implemented.");
    }

    async create(taskType: TasksTypeDataModel): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(TasksTypeDataModel)
            .values(taskType)
            .execute();
    }

    update(taskType: TasksTypeDataModel): void {
        throw new Error("Method not implemented.");
    }

    delete(typeId: number): void {
        throw new Error("Method not implemented.");
    }

}