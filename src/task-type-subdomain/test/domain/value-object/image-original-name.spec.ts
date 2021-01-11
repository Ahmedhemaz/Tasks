import { EMPTY_IMAGE_ORIGINAL_NAME_ERROR } from "../../../domain/error-messages/errors";
import { EmptyStringException } from "../../../domain/exceptions/emptyString.exception";
import { ImageOriginalName } from "../../../domain/value-objects/image-original-name"

describe('Image Original Name', () => {
    const imageOriginalName1 = new ImageOriginalName('org1');
    const imageOriginalName2 = new ImageOriginalName('org2');

    it('should create image original name value object', () => {
        expect(new ImageOriginalName('test')).toBeTruthy();
    });

    it('should throw image original name can\'t be empty', () => {
        expect(() => new ImageOriginalName(''))
            .toThrowError(new EmptyStringException(EMPTY_IMAGE_ORIGINAL_NAME_ERROR));
    });

    it('imageOriginalName1 should equal imageOriginalName1', () => {
        expect(imageOriginalName1.equals(imageOriginalName1)).toBe(true);
    });

    it('imageOriginalName1 should not equal imageOriginalName2', () => {
        expect(imageOriginalName1.equals(imageOriginalName2)).toBe(false);
    })

})