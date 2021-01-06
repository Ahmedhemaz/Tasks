import { Request } from "express";
import { UniqueIdentity } from "../../../shared-kernal/value-object/uniqueIdentity";

export class FileNamingService {

    private fileId: UniqueIdentity;

    constructor() {
        this.fileId = new UniqueIdentity();
    }

    fileNaming = (req: Request, file: Express.Multer.File, cb: Function): void => {
        cb(null, this.fileId.getUniqueIdentity() + '|' + file.originalname);
    }
}