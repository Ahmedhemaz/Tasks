import isEmpty from "validator/lib/isEmpty";

import { IValueObject } from "../../../shared-kernal/interfaces/IValueObject";
import { EMPTY_IMAGE_KEY_NAME_ERROR } from "../error-messages/errors";
import { EmptyStringException } from "../exceptions/emptyString.exception";

export class ImageKeyName implements IValueObject<ImageKeyName> {
    private readonly imageKeyName: string;

    constructor(imageKeyName: string) {

        if (isEmpty(imageKeyName, { ignore_whitespace: true }))
            throw new EmptyStringException(EMPTY_IMAGE_KEY_NAME_ERROR);

        this.imageKeyName = imageKeyName;
    }
    equals(imageKeyName: ImageKeyName): boolean {
        return imageKeyName.getImageKeyName() === this.imageKeyName;
    }

    public getImageKeyName(): Readonly<string> {
        return this.imageKeyName;
    }

}