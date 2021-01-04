import { IValueObject } from '../../../shared-kernal/interfaces/IValueObject';
import { EMPTY_NAME_ERROR } from '../error-messages/errors';
import { EmptyStringException } from '../exceptions/emptyString.exception';

import isEmpty from 'validator/lib/isEmpty';
export class Name implements IValueObject<Name> {

    private readonly name: string;

    constructor(name: string) {
        if (isEmpty(name, { ignore_whitespace: true })) throw new EmptyStringException(EMPTY_NAME_ERROR);
        this.name = name;
    }

    equals(typeName: Name): boolean {
        return typeName.getname() === this.name;
    }

    public getname(): Readonly<string> {
        return this.name;
    }

}