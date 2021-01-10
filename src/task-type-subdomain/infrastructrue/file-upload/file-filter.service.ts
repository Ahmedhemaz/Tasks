import { HttpException, HttpStatus } from "@nestjs/common";
import { Request } from "express";

export class FileFilterService {

    private readonly allowedExtensions: string[];
    private readonly filterErrorMessage: string;

    constructor(allowedExtensions: string[], filterErrorMessage: string) {
        this.allowedExtensions = [...allowedExtensions];
        this.filterErrorMessage = filterErrorMessage;
    }

    fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
        if (!this.allowedExtensions.includes(file.mimetype)) {
            return cb(
                new HttpException(this.filterErrorMessage, HttpStatus.BAD_REQUEST),
                false
            );
        }
        cb(null, true);
    }
}
