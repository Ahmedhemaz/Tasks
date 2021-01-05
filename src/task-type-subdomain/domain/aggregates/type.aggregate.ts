import { UniqueIdentity } from "../../../shared-kernal/value-object/uniqueIdentity";
import { Name } from "../value-objects/name";

export class TaskTypeAggregate {

    private readonly uId: UniqueIdentity;

    private name: Name;

    constructor(name: string, uId?: string) {

        this.uId = new UniqueIdentity(uId);
        this.name = new Name(name);
    }

    public typeUID(): string {
        return this.uId.getUniqueIdentity();
    }

    public typeName(): string {
        return this.name.getname();
    }

    public setTypeName(name: string): void {
        this.name = new Name(name);
    }

}