import { Name } from '../../../domain/TypeAggregate/value-objects/name';
import { EMPTY_NAME_ERROR } from '../../../domain/error-messages/errors';
import { EmptyStringException } from '../../../domain/exceptions/emptyString.exception';


describe('Task Type Name', () => {
    it('should create type name', () => {
        expect(new Name('health').getname()).toBe('health');
    });

    it('should throw name can\'t be empty ', () => {
        expect(() => new Name('').getname())
            .toThrowError(new EmptyStringException(EMPTY_NAME_ERROR));
    });
});