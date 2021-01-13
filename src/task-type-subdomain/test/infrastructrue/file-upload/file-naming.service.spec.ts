import { FileNamingService } from "../../../infrastructrue/file-upload/file-naming.service";
import { Request } from 'express';
describe('test file Naming service', () => {

    const validFile = {
        fieldname: 'mockedFieldName',
        originalname: 'mockedOriginalName',
        mimetype: 'image/png'
    } as Express.Multer.File

    const req: Partial<Request> = {};

    it('should call callback function with (null, data.ISO+-+originalName)', done => {
        const fileNamingService: FileNamingService = new FileNamingService();
        const testDate = new Date().toISOString();
        function callback(x, y) {
            expect(x).toBe(null);
            expect(y).toBe(testDate + '-' + validFile.originalname);
            done();
        }
        fileNamingService.fileNaming(req as Request, validFile, callback);
    });
})