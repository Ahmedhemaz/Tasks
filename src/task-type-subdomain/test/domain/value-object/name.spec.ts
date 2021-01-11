import { Name } from '../../../domain/value-objects/name';
import { EMPTY_NAME_ERROR } from '../../../domain/error-messages/errors';
import { EmptyStringException } from '../../../domain/exceptions/emptyString.exception';


describe('Task Type Name', () => {

    const typeName1 = new Name('health');
    const typeName2 = new Name('work');

    it('should create type name', () => {
        expect(typeName1.getname()).toBe('health');
    });

    it('should throw name can\'t be empty ', () => {
        expect(() => new Name(''))
            .toThrowError(new EmptyStringException(EMPTY_NAME_ERROR));
    });

    it('should typeName1 equals typeName2 return true', () => {
        expect(typeName1.equals(typeName1)).toBe(true);
    });

    it('should typeName1 not equals typeName2 return true', () => {
        expect(typeName1.equals(typeName2)).toBe(false);
    });

});