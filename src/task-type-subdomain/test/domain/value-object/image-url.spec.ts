import { EMPTY_IMAGE_URL_ERROR } from "../../../domain/error-messages/errors";
import { EmptyStringException } from "../../../domain/exceptions/emptyString.exception";
import { ImageURL } from "../../../domain/value-objects/image-url"

describe('Image URL', () => {
    const imageURL1 = new ImageURL('url1');
    const imageURL2 = new ImageURL('url2');

    it('should create image url value object', () => {
        expect(new ImageURL('test')).toBeTruthy();
    });

    it('should throw image url can\'t be emoty', () => {
        expect(() => new ImageURL(''))
            .toThrowError(new EmptyStringException(EMPTY_IMAGE_URL_ERROR));
    });

    it('imageURL1 should equal imageURL1', () => {
        expect(imageURL1.equals(imageURL1)).toBe(true);
    });

    it('imageURL1 should not equal imageURL2', () => {
        expect(imageURL1.equals(imageURL2)).toBe(false);
    });
});