import { Inject, Injectable } from "@nestjs/common";

import { IAggregateDataModelMapper } from "../../../shared-kernal/interfaces/IAggregateDataModelMapper";
import { IDomainEntityDataModelMapper_DI_TOKEN } from "../../../shared-kernal/interfaces/IDomainModelDataModelMapper";
import { TaskTypeAggregate } from "../../domain/aggregates/type.aggregate";
import { TasksTypeDataModel } from "../persistance/models/type-name.dataModel";
import { TypeImageMapper } from "./image.mapper";

@Injectable()
export class TasksTypeMapper implements IAggregateDataModelMapper<TaskTypeAggregate, TasksTypeDataModel> {

    public mapAggregateToDataModel(taskTypeAggregate: TaskTypeAggregate): TasksTypeDataModel {
        const taskType: TasksTypeDataModel = new TasksTypeDataModel();
        taskType.id = taskTypeAggregate.typeUID();
        taskType.name = taskTypeAggregate.typeName();
        return taskType;
    }

    public mapDataModelToAggregate(taskTypeDataModel: TasksTypeDataModel): TaskTypeAggregate {
        return new TaskTypeAggregate(
            taskTypeDataModel.name,
            taskTypeDataModel.id,
        );
    }

}