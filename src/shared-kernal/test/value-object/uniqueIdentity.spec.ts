import { InvalidUniqueIdentityException } from "../../exceptions/invalidUniqueIdentity.exception";
import { UniqueIdentity } from "../../value-object/uniqueIdentity";
import { INVALID_UUID_V4 } from '../../errors/error-messages';
jest.mock('uuid', () => ({ v4: () => '76b98d2c-649c-413d-a211-7aa18ff71ce2' }));

describe('UniqueIdentity test', () => {
    const mockedId1 = '76b98d2c-649c-413d-a211-7aa18ff71ce2';
    const mockedId2 = '2cd97a1a-4d7c-4cfe-a9ce-cfa9c8e73b76';

    it('should generate uniqueIdentity ', () => {
        const result = new UniqueIdentity().getUniqueIdentity();
        expect(result).toEqual(mockedId1);
    });

    it('unique identites should be equals', () => {
        const uid1 = new UniqueIdentity(mockedId1);
        expect(uid1.equals(uid1)).toBe(true);
    });

    it('unique identites shouldn\'t be equals', () => {
        const uid1 = new UniqueIdentity(mockedId1);
        const uid2 = new UniqueIdentity(mockedId2);
        expect(uid1.equals(uid2)).toBe(false);
    });

    it('should throw invalid unique identity ', () => {
        expect(() => new UniqueIdentity('12345'))
            .toThrowError(new InvalidUniqueIdentityException(INVALID_UUID_V4));
    });


})