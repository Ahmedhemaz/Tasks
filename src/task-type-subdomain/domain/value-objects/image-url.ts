import isEmpty from "validator/lib/isEmpty";

import { IValueObject } from "../../../shared-kernal/interfaces/IValueObject";
import { EMPTY_IMAGE_URL_ERROR } from "../error-messages/errors";
import { EmptyStringException } from "../exceptions/emptyString.exception";

export class ImageURL implements IValueObject<ImageURL> {
    private readonly url: string;

    constructor(url: string) {

        if (isEmpty(url, { ignore_whitespace: true }))
            throw new EmptyStringException(EMPTY_IMAGE_URL_ERROR);

        this.url = url;
    }
    equals(imageURL: ImageURL): boolean {
        return imageURL.getImageURL() === this.url;
    }

    public getImageURL(): Readonly<string> {
        return this.url;
    }

}