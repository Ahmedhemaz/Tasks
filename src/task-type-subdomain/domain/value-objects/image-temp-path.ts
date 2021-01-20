import isEmpty from "validator/lib/isEmpty";

import { IValueObject } from "../../../shared-kernal/interfaces/IValueObject";
import { EMPTY_IMAGE_TEMP_PATH } from "../error-messages/errors";
import { EmptyStringException } from "../exceptions/emptyString.exception";

export class ImageTempPath implements IValueObject<ImageTempPath> {
    private readonly tempPath: string;

    constructor(tempPath: string) {

        if (isEmpty(tempPath, { ignore_whitespace: true }))
            throw new EmptyStringException(EMPTY_IMAGE_TEMP_PATH);

        this.tempPath = tempPath;
    }
    equals(imageTempPath: ImageTempPath): boolean {
        return imageTempPath.getImageTempPath() === this.tempPath;
    }

    public getImageTempPath(): Readonly<string> {
        return this.tempPath;
    }

}