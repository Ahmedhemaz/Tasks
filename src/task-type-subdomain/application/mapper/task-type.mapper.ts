import { IAggregateDataModelMapper } from "../../../shared-kernal/interfaces/IAggregateDataModelMapper";
import { TaskTypeAggregate } from "../../domain/aggregates/type.aggregate";
import { TasksTypeDataModel } from "../../infrastructrue/persistance/models/type-name.dataModel";

export class TasksTypeMapper implements IAggregateDataModelMapper<TaskTypeAggregate, TasksTypeDataModel> {

    public mapAggregateToDataModel(aggregate: TaskTypeAggregate): TasksTypeDataModel {
        throw new Error("Method not implemented.");
    }

    public mapDataModelToAggregate(dataModel: TasksTypeDataModel): TaskTypeAggregate {
        throw new Error("Method not implemented.");
    }

}