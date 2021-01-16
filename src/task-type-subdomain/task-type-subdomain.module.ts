import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TaskTypeController } from './application/task-type.controller';
import { TasksTypeMapper } from './infrastructrue/mapper/task-type.mapper';
import { TasksTypeRepository } from './infrastructrue/persistance/repositories/tasks-type.repository';
import { ITasksTypeReposiroty_DI_TOKEN } from './infrastructrue/persistance/interfaces/ITasksTypeRepository';
import { IAggregateDataModelMapper_DI_TOKEN } from '../shared-kernal/interfaces/IAggregateDataModelMapper';
import { TypeImageMapper } from './infrastructrue/mapper/image.mapper';
import { IDomainEntityDataModelMapper_DI_TOKEN } from '../shared-kernal/interfaces/IDomainModelDataModelMapper';
import { CreateTaskTypeMiddleware } from './application/middlewares/CreateTaskType.middleware';
import { S3Service } from './infrastructrue/file-upload/aws-upload.service';
@Module({
    controllers: [TaskTypeController],
    providers: [
        { useClass: TasksTypeRepository, provide: ITasksTypeReposiroty_DI_TOKEN, },
        { useClass: TasksTypeMapper, provide: IAggregateDataModelMapper_DI_TOKEN },
        { useClass: TypeImageMapper, provide: IDomainEntityDataModelMapper_DI_TOKEN },
        S3Service
    ],
})
export class TaskTypeSubdomainModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CreateTaskTypeMiddleware).forRoutes(
            { path: 'task-types/upload', method: RequestMethod.POST }
        )
    }

}
