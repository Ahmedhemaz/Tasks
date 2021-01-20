import { INVALID_UUID_V4 } from "../../../../shared-kernal/errors/error-messages";
import { InvalidUniqueIdentityException } from "../../../../shared-kernal/exceptions/invalidUniqueIdentity.exception";
import { ImageDomainEntity } from "../../../domain/entities/image.domainEntity";
import { EMPTY_IMAGE_MIME_TYPE_ERROR, EMPTY_IMAGE_ORIGINAL_NAME_ERROR, EMPTY_IMAGE_KEY_NAME_ERROR, INVALID_IMAGE_FORMAT_ERROR } from "../../../domain/error-messages/errors";
import { EmptyStringException } from "../../../domain/exceptions/emptyString.exception";
import { InvalidFileTypeException } from "../../../infrastructrue/exceptions/invalid-file-extention.exception";

jest.mock('uuid', () => ({ v4: () => '2cd97a1a-4d7c-4cfe-a9ce-cfa9c8e73b76' }));

describe('Image Domain Entity Test', () => {
    const autoGenratedUUIDMock = '2cd97a1a-4d7c-4cfe-a9ce-cfa9c8e73b76';
    const mockedId1 = '76b98d2c-649c-413d-a211-7aa18ff71ce2';
    const invalidMockedUUID = '12345';
    const mockedImageKeyName = 'mockedImageKeyName';
    const mockedImageOriginalName = 'mockedOriginalName';
    const mockedImageMimeType = 'image/png';
    const invalidMockedImageMimeType = 'application/pdf';
    const mockedImageTempPath = '/tmp';

    it('should create Image Domain Entity with Mocked Image Data and Mocked Auto Generated UUID', () => {
        const imageDomainEntity: ImageDomainEntity = new ImageDomainEntity(mockedImageTempPath, mockedImageKeyName, mockedImageOriginalName, mockedImageMimeType);
        expect(imageDomainEntity.getImageId()).toBe(autoGenratedUUIDMock);
        expect(imageDomainEntity.getImageOriginalName()).toBe(mockedImageOriginalName);
        expect(imageDomainEntity.getImageKeyName()).toBe(mockedImageKeyName);
        expect(imageDomainEntity.getImageMimeType()).toBe(mockedImageMimeType);
    });

    it('should create Image Domain Entity with Mocked Image Data and provided UUID', () => {
        const imageDomainEntity: ImageDomainEntity = new ImageDomainEntity(mockedImageTempPath, mockedImageKeyName, mockedImageOriginalName, mockedImageMimeType, mockedId1);
        expect(imageDomainEntity.getImageId()).toBe(mockedId1);
        expect(imageDomainEntity.getImageOriginalName()).toBe(mockedImageOriginalName);
        expect(imageDomainEntity.getImageKeyName()).toBe(mockedImageKeyName);
        expect(imageDomainEntity.getImageMimeType()).toBe(mockedImageMimeType);
    });

    it('should throw invalid unique identity error', () => {
        expect(() => new ImageDomainEntity(mockedImageTempPath, mockedImageKeyName, mockedImageOriginalName, mockedImageMimeType, invalidMockedUUID))
            .toThrowError(new InvalidUniqueIdentityException(INVALID_UUID_V4));
    });

    it('should throw empty image key name error', () => {
        expect(() => new ImageDomainEntity(mockedImageTempPath, '', mockedImageOriginalName, mockedImageMimeType))
            .toThrowError(new EmptyStringException(EMPTY_IMAGE_KEY_NAME_ERROR));
    });

    it('should throw empty original name error', () => {
        expect(() => new ImageDomainEntity(mockedImageTempPath, mockedImageKeyName, '', mockedImageMimeType))
            .toThrowError(new EmptyStringException(EMPTY_IMAGE_ORIGINAL_NAME_ERROR));
    });

    it('should throw empty image mime type error', () => {
        expect(() => new ImageDomainEntity(mockedImageTempPath, mockedImageKeyName, mockedImageOriginalName, ''))
            .toThrowError(new EmptyStringException(EMPTY_IMAGE_MIME_TYPE_ERROR));
    });

    it('should throw invalid image mime type error', () => {
        expect(() => new ImageDomainEntity(mockedImageTempPath, mockedImageKeyName, mockedImageOriginalName, invalidMockedImageMimeType))
            .toThrowError(new InvalidFileTypeException(INVALID_IMAGE_FORMAT_ERROR));
    });
});