import { Module } from '@nestjs/common';
import { TaskTypeController } from './application/task-type.controller';
@Module({
    controllers: [TaskTypeController]
})
export class TaskTypeSubdomainModule { }
