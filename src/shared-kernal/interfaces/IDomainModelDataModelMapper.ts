export const IDomainEntityDataModelMapper_DI_TOKEN = Symbol('IDomainEntityDataModelMapper<DomainEntity, DataModel>');
export interface IDomainEntityDataModelMapper<DomainEntity, DataModel> {
    mapDomainEntityToDataModel(domainModel: DomainEntity): DataModel;
    mapDataModelToDomainEntity(dataModel: DataModel): DomainEntity;
}