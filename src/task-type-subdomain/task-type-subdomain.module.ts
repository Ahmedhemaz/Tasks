import { Module } from '@nestjs/common';
import { TaskTypeController } from './application/task-type.controller';
import { TasksTypeRepository } from './infrastructrue/persistance/repositories/tasks-type.repository';
@Module({
    controllers: [TaskTypeController],
    providers: [TasksTypeRepository]
})
export class TaskTypeSubdomainModule { }
