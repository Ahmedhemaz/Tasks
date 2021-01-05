export interface IAggregateDataModelMapper<Aggregate, DataModel> {

    mapAggregateToDataModel(aggregate: Aggregate): DataModel;
    mapDataModelToAggregate(dataModel: DataModel): Aggregate;

}