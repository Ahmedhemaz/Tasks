import { DOMAIN_EXCEPTIONS_TYPE } from "../constants";
import { IDomainException } from "../interfaces/IDomainException.interface";

export class InvalidImageFormatException extends Error implements IDomainException {
    public readonly name: string;
    public readonly message: string;
    public readonly type: string;
    constructor(message?: string) {
        super(message);
        this.name = 'InvalidImageFormatException';
        this.message = message || `invalid image format`;
        this.type = DOMAIN_EXCEPTIONS_TYPE;
    }
}