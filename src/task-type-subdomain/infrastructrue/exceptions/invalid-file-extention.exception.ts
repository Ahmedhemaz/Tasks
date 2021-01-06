export class InvalidFileTypeException extends Error {
    public readonly name: string;
    public readonly message: string;
    constructor(message?: string) {
        super(message);
        this.name = 'InvalidFileTypeException';
        this.message = message || `invalid file type`;
    }
}