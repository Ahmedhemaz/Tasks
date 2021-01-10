import { IsNotEmpty, IsString, MinLength, MaxLength, IsAlpha } from 'class-validator';

export class TaskTypeDTO {

    @IsNotEmpty({
        message: 'name Can\'t be empty.'
    })
    @IsString({
        message: 'name must be string.'
    })
    @MinLength(3, {
        message: 'name is too short! Must be more than 3 characters.'
    })
    @MaxLength(50, {
        message: 'name is too long! Must be less than 50 characters.'
    })
    @IsAlpha()
    name: string
}