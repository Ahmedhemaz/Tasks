import { Body, Controller, Get, HttpStatus, Inject, Injectable, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { diskStorage } from 'multer';

import { TasksTypeDataModel } from '../infrastructrue/persistance/models/type-name.dataModel';
import { ITasksTypeRepository, ITasksTypeReposiroty_DI_TOKEN } from '../infrastructrue/persistance/interfaces/ITasksTypeRepository';
import { FileFilterService } from '../infrastructrue/file-upload/file-filter.service';
import { FileNamingService } from '../infrastructrue/file-upload/file-naming.service';
import { IAggregateDataModelMapper, IAggregateDataModelMapper_DI_TOKEN } from '../../shared-kernal/interfaces/IAggregateDataModelMapper';
import { TaskTypeAggregate } from '../domain/aggregates/type.aggregate';
import { TaskTypeDTO } from './DTOs/task-type.dto';
import { ImageDomainEntity } from '../domain/entities/image.domainEntity';
import { IDomainEntityDataModelMapper_DI_TOKEN } from '../../shared-kernal/interfaces/IDomainModelDataModelMapper';
import { TypeImageMapper } from '../infrastructrue/mapper/image.mapper';
import { ImageDataModel } from '../infrastructrue/persistance/models/image.dataModel';

@Controller('task-types')
@Injectable()
export class TaskTypeController {

    constructor(
        @Inject(ITasksTypeReposiroty_DI_TOKEN) private readonly tasksTypeRepository: ITasksTypeRepository,
        @Inject(IAggregateDataModelMapper_DI_TOKEN) private readonly tasksTypeMapper: IAggregateDataModelMapper<TaskTypeAggregate, TasksTypeDataModel>,
        @Inject(IDomainEntityDataModelMapper_DI_TOKEN) private readonly typeImageMapper: TypeImageMapper
    ) { }

    @Get()
    async findOne(): Promise<string> {
        return 'BELLO';
    }

    @Post()
    async create(@Body() taskTypeDto: TaskTypeDTO, @Res() res: Response) {
        const taskTypeAggregate = new TaskTypeAggregate(taskTypeDto.name);
        this.tasksTypeRepository.create(this.tasksTypeMapper.mapAggregateToDataModel(taskTypeAggregate));
        res.status(HttpStatus.CREATED).send({ message: 'Type Created Successfully.' });
    }


    @Post('upload')
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                filename: new FileNamingService().fileNaming,
                destination: './uploads'
            }),
            fileFilter: (new FileFilterService(['image/png', 'image/jpg', 'image/jpeg'])).fileFilter
        }))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() taskTypeDto: TaskTypeDTO) {
        if (file) {
            const imageDomainEntity: ImageDomainEntity = new ImageDomainEntity(
                file.path,
                file.originalname,
                file.mimetype,
            );
            const taskTypeAggregate: TaskTypeAggregate = new TaskTypeAggregate(taskTypeDto.name, imageDomainEntity);
            const taskTypeDataModel: TasksTypeDataModel = this.tasksTypeMapper.mapAggregateToDataModel(taskTypeAggregate);
            const imageDataModel: ImageDataModel = this.typeImageMapper.mapDomainEntityToDataModel(taskTypeAggregate.typeImage());
            this.tasksTypeRepository.createWithImage(taskTypeDataModel, imageDataModel);
        } else {
            const taskTypeAggregate = new TaskTypeAggregate(taskTypeDto.name);
            this.tasksTypeRepository.create(this.tasksTypeMapper.mapAggregateToDataModel(taskTypeAggregate));
        }
    }
}