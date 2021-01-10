import { Injectable } from "@nestjs/common";

import { IAggregateDataModelMapper } from "../../../shared-kernal/interfaces/IAggregateDataModelMapper";
import { TaskTypeAggregate } from "../../domain/aggregates/type.aggregate";
import { TasksTypeDataModel } from "../persistance/models/type-name.dataModel";

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
            null,
            taskTypeDataModel.id,
        );
    }

}