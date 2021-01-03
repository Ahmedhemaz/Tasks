import { Controller, Get } from '@nestjs/common';

@Controller('task-types')
export class TaskTypeController {
    @Get()
    findOne(): string {
        return 'BELLO';
    }
}