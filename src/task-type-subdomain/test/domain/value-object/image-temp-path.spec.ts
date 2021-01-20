import { EMPTY_IMAGE_TEMP_PATH } from "../../../domain/error-messages/errors";
import { EmptyStringException } from "../../../domain/exceptions/emptyString.exception";
import { ImageTempPath } from "../../../domain/value-objects/image-temp-path"

describe('Image URL', () => {
    const imageTempPath1 = new ImageTempPath('imageTempPath1');
    const imageTempPath2 = new ImageTempPath('imageTempPath2');

    it('should create image url value object', () => {
        expect(new ImageTempPath('test')).toBeTruthy();
    });

    it('should throw image url can\'t be emoty', () => {
        expect(() => new ImageTempPath(''))
            .toThrowError(new EmptyStringException(EMPTY_IMAGE_TEMP_PATH));
    });

    it('imageTempPath1 should equal imageTempPath1', () => {
        expect(imageTempPath1.equals(imageTempPath1)).toBe(true);
    });

    it('imageTempPath1 should not equal imageTempPath2', () => {
        expect(imageTempPath1.equals(imageTempPath2)).toBe(false);
    });
});