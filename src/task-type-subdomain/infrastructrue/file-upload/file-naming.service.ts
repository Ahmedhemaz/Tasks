import { Request } from "express";
export class FileNamingService {
    fileNaming = (req: Request, file: Express.Multer.File, cb: Function): void => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
}