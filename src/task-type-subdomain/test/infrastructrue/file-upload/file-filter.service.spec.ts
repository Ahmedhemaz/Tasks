import { HttpException, HttpStatus } from "@nestjs/common";
import { VALID_IMAGE_FORMATS } from "../../../domain/constants";
import { FileFilterService } from "../../../infrastructrue/file-upload/file-filter.service";
import { Request } from 'express';
describe('File Filter Service Test', () => {
    const validFileExtensions: string[] = VALID_IMAGE_FORMATS;
    const filterErrorMessage: string = 'Invalid file format';
    const validFile = {
        fieldname: 'mockedFieldName',
        originalname: 'mockedOriginalName',
        mimetype: 'image/png'
    } as Express.Multer.File

    const invalidFile = {
        fieldname: 'mockedFieldName',
        originalname: 'mockedOriginalName',
        mimetype: 'application/png'
    } as Express.Multer.File

    const req: Partial<Request> = {};
    it('it should call callback function with (null, true)', done => {
        const fileFilterService: FileFilterService = new FileFilterService(validFileExtensions, filterErrorMessage);
        function callback(x, y) {
            expect(x).toBe(null);
            expect(y).toBe(true);
            done();
        }
        fileFilterService.fileFilter(req as Request, validFile, callback);
    });

    it('it should call callback function with (httpException, false)', done => {
        const httpException: HttpException = new HttpException(filterErrorMessage, HttpStatus.BAD_REQUEST);
        const fileFilterService: FileFilterService = new FileFilterService(validFileExtensions, filterErrorMessage);
        function callback(x, y) {
            expect(x).toStrictEqual(httpException);
            expect(y).toBe(false);
            done();
        }
        fileFilterService.fileFilter(req as Request, invalidFile, callback);
    });

})