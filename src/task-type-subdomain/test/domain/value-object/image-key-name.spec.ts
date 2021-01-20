import { EMPTY_IMAGE_KEY_NAME_ERROR } from "../../../domain/error-messages/errors";
import { EmptyStringException } from "../../../domain/exceptions/emptyString.exception";
import { ImageKeyName } from "../../../domain/value-objects/image-key-name"

describe('Image URL', () => {
    const imageKeyName1 = new ImageKeyName('imageKeyName1');
    const imageKeyName2 = new ImageKeyName('imageKeyName2');

    it('should create image url value object', () => {
        expect(new ImageKeyName('test')).toBeTruthy();
    });

    it('should throw image url can\'t be emoty', () => {
        expect(() => new ImageKeyName(''))
            .toThrowError(new EmptyStringException(EMPTY_IMAGE_KEY_NAME_ERROR));
    });

    it('imageKeyName1 should equal imageKeyName1', () => {
        expect(imageKeyName1.equals(imageKeyName1)).toBe(true);
    });

    it('imageKeyName1 should not equal imageKeyName2', () => {
        expect(imageKeyName1.equals(imageKeyName2)).toBe(false);
    });
});