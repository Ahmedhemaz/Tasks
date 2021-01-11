import { IDomainException } from "../interfaces/IDomainException.interface";
import { DOMAIN_EXCEPTIONS_TYPE } from '../constants';
export class EmptyStringException extends Error implements IDomainException {
    public readonly name: string;
    public readonly message: string;
    public readonly type: string;
    constructor(message?: string) {
        super(message);
        this.name = 'EmptyStringException';
        this.message = message || `string can't be empty`;
        this.type = DOMAIN_EXCEPTIONS_TYPE;
    }
}