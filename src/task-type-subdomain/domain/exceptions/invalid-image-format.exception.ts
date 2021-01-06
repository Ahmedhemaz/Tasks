export class InvalidImageFormatException extends Error {
    public readonly name: string;
    public readonly message: string;
    constructor(message?: string) {
        super(message);
        this.name = 'InvalidImageFormatException';
        this.message = message || `invalid image format`;
    }
}