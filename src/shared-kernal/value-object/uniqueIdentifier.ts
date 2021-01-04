import { v4 as uuidv4 } from 'uuid';
import isUUID from 'validator/lib/isUUID';

import { IValueObject } from "../interfaces/IValueObject";
import { INVALID_UUID_V4 } from "../errors/error-messages";
import { InvalidUniqueIdentityException } from "../exceptions/invalidUniqueIdentity.exception";

export class UniqueIdentity implements IValueObject<UniqueIdentity> {

    private readonly uniqueIdentity: string;

    constructor(uniqueIdentity?: string) {
        if (uniqueIdentity) {
            if (!isUUID(uniqueIdentity, '4'))
                throw new InvalidUniqueIdentityException(INVALID_UUID_V4);
            this.uniqueIdentity = uniqueIdentity;
        } else {
            this.uniqueIdentity = uuidv4();
        }
    }

    equals(anUniqueEntityIdentity: UniqueIdentity): boolean {
        return this.uniqueIdentity === anUniqueEntityIdentity.getUniqueIdentity();
    }

    public getUniqueIdentity(): Readonly<string> {
        return this.uniqueIdentity
    }

}