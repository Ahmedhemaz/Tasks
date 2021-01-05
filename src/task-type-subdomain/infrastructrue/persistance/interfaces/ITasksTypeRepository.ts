import { TasksTypeDataModel } from "../models/type-name.dataModel";

export const ITasksTypeReposiroty_DI_TOKEN = Symbol('ITasksTypeReposiroty');
export interface ITasksTypeRepository {

    getTypeById(typeId: number): TasksTypeDataModel;

    getTypeByName(typeName: string): TasksTypeDataModel;

    create(taskType: TasksTypeDataModel): void;

    update(taskType: TasksTypeDataModel): void;

    delete(typeId: number): void;
}