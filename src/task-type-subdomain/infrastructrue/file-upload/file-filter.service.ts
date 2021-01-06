import { Request } from "express";
import { InvalidFileTypeException } from "../exceptions/invalid-file-extention.exception";

export class FileFilterService {

    private readonly allowedExtensions: string[];

    constructor(allowedExtensions: string[]) {
        this.allowedExtensions = [...allowedExtensions];
    }

    fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
        if (!this.allowedExtensions.includes(file.mimetype)) {
            return cb(new InvalidFileTypeException(), false);
        }
        cb(null, true);
    }
}
