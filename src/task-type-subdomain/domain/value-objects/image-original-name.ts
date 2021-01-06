import isEmpty from "validator/lib/isEmpty";

import { IValueObject } from "../../../shared-kernal/interfaces/IValueObject";
import { EMPTY_IMAGE_ORIGINAL_NAME_ERROR } from "../error-messages/errors";
import { EmptyStringException } from "../exceptions/emptyString.exception";

export class ImageOriginalName implements IValueObject<ImageOriginalName> {
    private readonly originalName: string;

    constructor(originalName: string) {

        if (isEmpty(originalName, { ignore_whitespace: true }))
            throw new EmptyStringException(EMPTY_IMAGE_ORIGINAL_NAME_ERROR);

        this.originalName = originalName;
    }
    equals(imageURL: ImageOriginalName): boolean {
        return imageURL.getImageOriginalName() === this.originalName;
    }

    public getImageOriginalName(): Readonly<string> {
        return this.originalName;
    }
}