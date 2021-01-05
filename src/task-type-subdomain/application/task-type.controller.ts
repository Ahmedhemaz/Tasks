import { Controller, Get, HttpCode, Inject, Injectable, Post, Req } from '@nestjs/common';
import { TasksTypeDataModel } from '../infrastructrue/persistance/models/type-name.dataModel';
import { ITasksTypeRepository, ITasksTypeReposiroty_DI_TOKEN } from '../infrastructrue/persistance/interfaces/ITasksTypeRepository';
import { IAggregateDataModelMapper, IAggregateDataModelMapper_DI_TOKEN } from '../../shared-kernal/interfaces/IAggregateDataModelMapper';
import { TaskTypeAggregate } from '../domain/aggregates/type.aggregate';
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
    @HttpCode(204)
    create() {
        const taskTypeAggregate = new TaskTypeAggregate('sports');
        this.tasksTypeRepository.create(this.tasksTypeMapper.mapAggregateToDataModel(taskTypeAggregate));
        return 'new Type created';
    }
}