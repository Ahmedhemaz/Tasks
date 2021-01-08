import { Injectable } from "@nestjs/common";
import { IDomainEntityDataModelMapper } from "../../../shared-kernal/interfaces/IDomainModelDataModelMapper";
import { ImageDomainEntity } from "../../domain/entities/image.domainEntity";
import { ImageDataModel } from "../persistance/models/image.dataModel";

@Injectable()
export class TypeImageMapper implements IDomainEntityDataModelMapper<ImageDomainEntity, ImageDataModel> {

    mapDomainEntityToDataModel(imageDomainEntity: ImageDomainEntity): ImageDataModel {
        const imageDataModel: ImageDataModel = new ImageDataModel();
        imageDataModel.id = imageDomainEntity.getImageId();
        imageDataModel.originalName = imageDomainEntity.getImageOriginalName();
        imageDataModel.url = imageDomainEntity.getImageUrl();
        imageDataModel.mimeType = imageDomainEntity.getImageMimeType();
        return imageDataModel;
    }
    mapDataModelToDomainEntity(imageDataModel: ImageDataModel): ImageDomainEntity {
        return new ImageDomainEntity(
            imageDataModel.url,
            imageDataModel.originalName,
            imageDataModel.mimeType,
            imageDataModel.id
        );
    }

}