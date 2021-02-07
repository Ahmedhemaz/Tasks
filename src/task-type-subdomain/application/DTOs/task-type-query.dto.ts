import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class TaskTypeQueryDTO {

    @IsNotEmpty({
        message: 'name Can\'t be empty.'
    })
    @IsString({
        message: 'name must be string.'
    })
    name: string
}