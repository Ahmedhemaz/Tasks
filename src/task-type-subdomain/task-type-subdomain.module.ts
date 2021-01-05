import { Module } from '@nestjs/common';
import { TaskTypeController } from './application/task-type.controller';
import { TasksTypeMapper } from './infrastructrue/mapper/task-type.mapper';
import { TasksTypeRepository } from './infrastructrue/persistance/repositories/tasks-type.repository';
import { ITasksTypeReposiroty_DI_TOKEN } from './infrastructrue/persistance/interfaces/ITasksTypeRepository';
import { IAggregateDataModelMapper_DI_TOKEN } from '../shared-kernal/interfaces/IAggregateDataModelMapper';

@Module({
    controllers: [TaskTypeController],
    providers: [
        { useClass: TasksTypeRepository, provide: ITasksTypeReposiroty_DI_TOKEN },
        { useClass: TasksTypeMapper, provide: IAggregateDataModelMapper_DI_TOKEN }
    ],
})
export class TaskTypeSubdomainModule { }
