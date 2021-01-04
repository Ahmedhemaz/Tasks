import { Controller, Get, HttpCode, Injectable, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { TasksTypeRepository } from '../infrastructrue/persistance/repositories/tasks-type.repository';
import { TasksTypeDataModel } from '../infrastructrue/persistance/models/type-name.dataModel';
@Controller('task-types')
@Injectable()
export class TaskTypeController {

    constructor(private tasksTypeRepository: TasksTypeRepository) { }

    @Get()
    findOne(): string {
        return 'BELLO';
    }

    @Post()
    @HttpCode(204)
    create() {
        const taskType: TasksTypeDataModel = new TasksTypeDataModel();
        taskType.name = 'health';
        this.tasksTypeRepository.create(taskType);
        return 'new Type created';
    }
}