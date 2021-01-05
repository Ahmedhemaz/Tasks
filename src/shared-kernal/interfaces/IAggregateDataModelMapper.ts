export const IAggregateDataModelMapper_DI_TOKEN = Symbol('IAggregateDataModelMapper<Aggregate, DataModel>');
export interface IAggregateDataModelMapper<Aggregate, DataModel> {

    mapAggregateToDataModel(aggregate: Aggregate): DataModel;
    mapDataModelToAggregate(dataModel: DataModel): Aggregate;

}