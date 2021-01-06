import { EMPTY_IMAGE_MIME_TYPE_ERROR, INVALID_IMAGE_FORMAT_ERROR } from "../../domain/error-messages/errors";
import { EmptyStringException } from "../../domain/exceptions/emptyString.exception";
import { InvalidImageFormatException } from "../../domain/exceptions/invalid-image-format.exception";
import { ImageMimeType } from "../../domain/value-objects/image-mimetype";

describe('Image Mime type', () => {
    const imageMimeType1 = new ImageMimeType('image/png');
    const imageMimeType2 = new ImageMimeType('image/jpeg');
    const invalidImageMimeType = 'application/pdf';

    it('should create image mimetype value object', () => {
        expect(new ImageMimeType('image/png')).toBeTruthy();
    });

    it('should throw image mimetype can\'t be empty', () => {
        expect(() => new ImageMimeType(''))
            .toThrowError(new EmptyStringException(EMPTY_IMAGE_MIME_TYPE_ERROR));
    });

    it('should throw Image Type must be {.png, .jpg, .jpeg} format', () => {
        expect(() => new ImageMimeType(invalidImageMimeType))
            .toThrowError(new InvalidImageFormatException(INVALID_IMAGE_FORMAT_ERROR));
    });

    it('should imageMimeType1 equals imageMimeType1', () => {
        expect(imageMimeType1.equals(imageMimeType1)).toBe(true);
    });

    it('should imageMimeType1 not equals imageMimeType2', () => {
        expect(imageMimeType1.equals(imageMimeType2)).toBe(false);
    });

});