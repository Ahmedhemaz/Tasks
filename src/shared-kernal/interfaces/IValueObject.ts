export interface IValueObject<T> {
    /**
     * checks if value objects have the same properties values 
     * @param valueObject value object we want to compare
     */
    equals(valueObject: T): boolean;
}