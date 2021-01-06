import isEmpty from "validator/lib/isEmpty";

import { IValueObject } from "../../../shared-kernal/interfaces/IValueObject";
import { EMPTY_IMAGE_MIME_TYPE_ERROR, INVALID_IMAGE_FORMAT_ERROR } from "../error-messages/errors";
import { EmptyStringException } from "../exceptions/emptyString.exception";
import { InvalidImageFormatException } from "../exceptions/invalid-image-format.exception";

export class ImageMimeType implements IValueObject<ImageMimeType> {

    private readonly mimeType: string;

    constructor(mimeType: string) {
        mimeType.trim();
        if (isEmpty(mimeType, { ignore_whitespace: true }))
            throw new EmptyStringException(EMPTY_IMAGE_MIME_TYPE_ERROR);
        if (!this.isValidImageMimeType(mimeType.trim()))
            throw new InvalidImageFormatException(INVALID_IMAGE_FORMAT_ERROR);
        this.mimeType = mimeType;
    }

    equals(imageURL: ImageMimeType): boolean {
        return imageURL.getImageMimeType() === this.mimeType;
    }

    public getImageMimeType(): Readonly<string> {
        return this.mimeType;
    }

    private isValidImageMimeType(mimeType: string): boolean {
        return mimeType.match(/\b(?:png|jpeg|jpg)\b/) ? true : false;
    }

}