export class InvalidImageTypeException extends Error {
    public readonly name: string;
    public readonly message: string;
    constructor(message?: string) {
        super(message);
        this.name = 'InvalidImageTypeException';
        this.message = message || `invalid image format`;
    }
}