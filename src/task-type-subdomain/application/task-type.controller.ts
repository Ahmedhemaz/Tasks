import { Body, Controller, Get, HttpStatus, Inject, Injectable, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
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

@Controller('task-types')
@Injectable()
export class TaskTypeController {

    constructor(
        @Inject(ITasksTypeReposiroty_DI_TOKEN) private readonly tasksTypeRepository: ITasksTypeRepository,
        @Inject(IAggregateDataModelMapper_DI_TOKEN) private readonly tasksTypeMapper: IAggregateDataModelMapper<TaskTypeAggregate, TasksTypeDataModel>
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
            fileFilter: (new FileFilterService(['image/png'])).fileFilter
        }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file.filename.split('|'));
    }
}