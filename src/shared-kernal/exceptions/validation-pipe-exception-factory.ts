import { BadRequestException, HttpStatus, ValidationError } from "@nestjs/common";
import { HttpErrors } from '../errors/http-errors-names';

const validationPipeExceptionFactory = (errors: ValidationError[]) => {
    const serializedErrors: any = {};
    errors.forEach(error => {
        serializedErrors[error.property] = Object.values(error.constraints).pop();
    });
    return new BadRequestException({
        messages: { ...serializedErrors },
        statusCode: HttpStatus.BAD_REQUEST,
        error: HttpErrors.BAD_REQUEST
    });
}

export {
    validationPipeExceptionFactory,
}