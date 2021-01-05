import { IAggregateDataModelMapper } from "../../../shared-kernal/interfaces/IAggregateDataModelMapper";
import { TaskTypeAggregate } from "../../domain/aggregates/type.aggregate";
import { TasksTypeDataModel } from "../persistance/models/type-name.dataModel";

export class TasksTypeMapper implements IAggregateDataModelMapper<TaskTypeAggregate, TasksTypeDataModel> {

    public mapAggregateToDataModel(taskTypeAggregate: TaskTypeAggregate): TasksTypeDataModel {
        const taskType: TasksTypeDataModel = new TasksTypeDataModel();
        taskType.id = taskTypeAggregate.typeUID();
        taskType.name = taskTypeAggregate.typeName();
        return taskType;
    }

    public mapDataModelToAggregate(dataModel: TasksTypeDataModel): TaskTypeAggregate {
        return new TaskTypeAggregate(dataModel.name, dataModel.id);
    }

}