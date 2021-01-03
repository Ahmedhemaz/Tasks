export class EmptyStringException  extends Error {
    public readonly name: string;
    public readonly message: string;
    constructor(message?: string){
        super(message);
        this.name = 'EmptyStringException';
        this.message = message || `string can't be empty`;        
    }
}