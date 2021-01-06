import isEmpty from "validator/lib/isEmpty";

import { IValueObject } from "../../../shared-kernal/interfaces/IValueObject";
import { EMPTY_IMAGE_MIME_TYPE_ERROR } from "../error-messages/errors";
import { EmptyStringException } from "../exceptions/emptyString.exception";

export class ImageMimeType implements IValueObject<ImageMimeType> {

    private readonly mimeType: string;

    constructor(mimeType: string) {

        if (isEmpty(mimeType, { ignore_whitespace: true }))
            throw new EmptyStringException(EMPTY_IMAGE_MIME_TYPE_ERROR);

        this.mimeType = mimeType;
    }
    equals(imageURL: ImageMimeType): boolean {
        return imageURL.getImageMimeType() === this.mimeType;
    }

    public getImageMimeType(): Readonly<string> {
        return this.mimeType;
    }

}