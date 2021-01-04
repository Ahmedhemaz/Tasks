import { TasksTypeDataModel } from "../models/type-name.entity";

export interface ITasksTypeRepository {

    getTypeById(typeId: number): TasksTypeDataModel;

    getTypeByName(typeName: string): TasksTypeDataModel;

    create(taskType: TasksTypeDataModel): void;

    update(taskType: TasksTypeDataModel): void;

    delete(typeId: number): void;
}