export interface IDomainModelDataModelMapper<DomainModel, DataModel> {

    mapDomainModelToDataModel(domainModel: DomainModel): DataModel;
    mapDataModelToDomainModel(dataModel: DataModel): DomainModel;

}