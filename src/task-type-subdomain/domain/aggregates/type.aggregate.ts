import { UniqueIdentity } from "../../../shared-kernal/value-object/uniqueIdentity";
import { ImageDomainEntity } from "../entities/image.domainEntity";
import { Name } from "../value-objects/name";

export class TaskTypeAggregate {

    private readonly uId: UniqueIdentity;
    private name: Name;
    private image: ImageDomainEntity;

    constructor(name: string, image?: ImageDomainEntity, uId?: string,) {

        this.uId = new UniqueIdentity(uId);
        this.name = new Name(name);
        this.image = image;

    }

    public typeUID(): string {
        return this.uId.getUniqueIdentity();
    }

    public typeImage(): ImageDomainEntity {
        return this.image;
    }

    public typeName(): string {
        return this.name.getname();
    }

    public setTypeName(name: string): void {
        this.name = new Name(name);
    }

    public changeTypeImage(image: ImageDomainEntity) {
        this.image = image;
    }

}