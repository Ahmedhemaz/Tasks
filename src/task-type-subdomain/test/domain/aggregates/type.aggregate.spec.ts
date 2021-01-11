import { INVALID_UUID_V4 } from "../../../../shared-kernal/errors/error-messages";
import { InvalidUniqueIdentityException } from "../../../../shared-kernal/exceptions/invalidUniqueIdentity.exception";
import { TaskTypeAggregate } from "../../../domain/aggregates/type.aggregate";
import { ImageDomainEntity } from "../../../domain/entities/image.domainEntity";
import { EMPTY_NAME_ERROR } from "../../../domain/error-messages/errors";
import { EmptyStringException } from "../../../domain/exceptions/emptyString.exception";

jest.mock('uuid', () => ({ v4: () => '2cd97a1a-4d7c-4cfe-a9ce-cfa9c8e73b76' }));

describe('TaskTypeAggregate Test', () => {
    const mockedName = 'health';
    const mockedId1 = '76b98d2c-649c-413d-a211-7aa18ff71ce2';
    const autoGenratedUUIDMock = '2cd97a1a-4d7c-4cfe-a9ce-cfa9c8e73b76';
    const imageDomainEntityMock = new ImageDomainEntity(
        'url', 'originalName', 'image/png'
    )

    it('should create TaskTypeAggregate with mockedName & mockedId', () => {

        const taskType: TaskTypeAggregate = new TaskTypeAggregate(mockedName, imageDomainEntityMock, mockedId1);
        expect(taskType.typeName()).toBe(mockedName);
        expect(taskType.typeUID()).toBe(mockedId1);
        expect(taskType.typeImage()).toBe(imageDomainEntityMock);
    });

    it('should create TaskTypeAggregate with mockedName only', () => {
        const taskType: TaskTypeAggregate = new TaskTypeAggregate(mockedName);
        expect(taskType.typeUID()).toBe(autoGenratedUUIDMock);
        expect(taskType.typeName()).toBe(mockedName);
    });

    it('should throw invalid unique identity error', () => {
        expect(() => new TaskTypeAggregate(mockedName, null, '12345'))
            .toThrowError(new InvalidUniqueIdentityException(INVALID_UUID_V4));
    });

    it('should throw empty string error', () => {
        expect(() => new TaskTypeAggregate('', null, mockedId1))
            .toThrowError(new EmptyStringException(EMPTY_NAME_ERROR));
    });

    it('should set taskName to sports', () => {
        const taskType: TaskTypeAggregate = new TaskTypeAggregate(mockedName);
        taskType.setTypeName('sports');
        expect(taskType.typeName()).toBe('sports');
    });

    it('should throw empty string exception when setting type name to empty string', () => {
        const taskType: TaskTypeAggregate = new TaskTypeAggregate(mockedName);
        expect(() => taskType.setTypeName(''))
            .toThrowError(new EmptyStringException(EMPTY_NAME_ERROR));
    })
})