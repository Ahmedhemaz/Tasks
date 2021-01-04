export class InvalidUniqueIdentityException extends Error {
    public readonly name: string;
    public readonly message: string;
    constructor(message?: string) {
        super(message);
        this.name = 'InvalidUniqueIdentityException';
        this.message = message || `invalid unique identity`;
    }
}