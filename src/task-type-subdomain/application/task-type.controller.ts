import { Body, Controller, Get, HttpStatus, Inject, Injectable, Post } from '@nestjs/common';
import { Response } from 'express';

import { TasksTypeDataModel } from '../infrastructrue/persistance/models/type-name.dataModel';
import { ITasksTypeRepository, ITasksTypeReposiroty_DI_TOKEN } from '../infrastructrue/persistance/interfaces/ITasksTypeRepository';
import { IAggregateDataModelMapper, IAggregateDataModelMapper_DI_TOKEN } from '../../shared-kernal/interfaces/IAggregateDataModelMapper';
import { TaskTypeAggregate } from '../domain/aggregates/type.aggregate';
import { TaskTypeDTO } from './DTOs/task-type.dto';
import { Res } from '@nestjs/common';

@Controller('task-types')
@Injectable()
export class TaskTypeController {

    constructor(
        @Inject(ITasksTypeReposiroty_DI_TOKEN) private readonly tasksTypeRepository: ITasksTypeRepository,
        @Inject(IAggregateDataModelMapper_DI_TOKEN) private readonly tasksTypeMapper: IAggregateDataModelMapper<TaskTypeAggregate, TasksTypeDataModel>
    ) { }

    @Get()
    findOne(): string {
        return 'BELLO';
    }

    @Post()
    async create(@Body() taskTypeDto: TaskTypeDTO, @Res() res: Response) {
        const taskTypeAggregate = new TaskTypeAggregate(taskTypeDto.name);
        this.tasksTypeRepository.create(this.tasksTypeMapper.mapAggregateToDataModel(taskTypeAggregate));
        res.status(HttpStatus.CREATED).send({ message: 'Type Created Successfully.' });
    }
}