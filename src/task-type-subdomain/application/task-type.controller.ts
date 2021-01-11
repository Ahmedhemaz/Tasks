import { Body, Controller, Get, HttpStatus, Inject, Injectable, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { diskStorage } from 'multer';

import { IAggregateDataModelMapper, IAggregateDataModelMapper_DI_TOKEN } from '../../shared-kernal/interfaces/IAggregateDataModelMapper';
import { IDomainEntityDataModelMapper_DI_TOKEN } from '../../shared-kernal/interfaces/IDomainModelDataModelMapper';
import { HttpErrors } from '../../shared-kernal/errors/http-errors-names';
import { TasksTypeDataModel } from '../infrastructrue/persistance/models/type-name.dataModel';
import { ITasksTypeRepository, ITasksTypeReposiroty_DI_TOKEN } from '../infrastructrue/persistance/interfaces/ITasksTypeRepository';
import { FileFilterService } from '../infrastructrue/file-upload/file-filter.service';
import { FileNamingService } from '../infrastructrue/file-upload/file-naming.service';
import { TypeImageMapper } from '../infrastructrue/mapper/image.mapper';
import { ImageDataModel } from '../infrastructrue/persistance/models/image.dataModel';
import { TaskTypeAggregate } from '../domain/aggregates/type.aggregate';
import { ImageDomainEntity } from '../domain/entities/image.domainEntity';
import { INVALID_IMAGE_FORMAT_ERROR } from '../domain/error-messages/errors';
import { DOMAIN_EXCEPTIONS_TYPE, VALID_IMAGE_FORMATS } from '../domain/constants';
import { TaskTypeDTO } from './DTOs/task-type.dto';
import { ResponseMessages } from './response-messages/response-messages';

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
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                filename: new FileNamingService().fileNaming,
                destination: './uploads'
            }),
            fileFilter: (new FileFilterService(VALID_IMAGE_FORMATS, INVALID_IMAGE_FORMAT_ERROR).fileFilter),
            limits: { fileSize: 1024 * 1024 * 3 },
        }))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() taskTypeDto: TaskTypeDTO, @Res() res: Response) {
        try {
            if (file) {
                const imageDomainEntity: ImageDomainEntity = new ImageDomainEntity(file.filename, file.originalname, file.mimetype);
                const taskTypeAggregate: TaskTypeAggregate = new TaskTypeAggregate(taskTypeDto.name, imageDomainEntity);
                const taskTypeDataModel: TasksTypeDataModel = this.tasksTypeMapper.mapAggregateToDataModel(taskTypeAggregate);
                const imageDataModel: ImageDataModel = this.typeImageMapper.mapDomainEntityToDataModel(taskTypeAggregate.typeImage());
                await this.tasksTypeRepository.createWithImage(taskTypeDataModel, imageDataModel);
                res.status(HttpStatus.CREATED).send({ message: ResponseMessages.TYPE_CREATED_SUCCESSFULLY });
            } else {
                const taskTypeAggregate = new TaskTypeAggregate(taskTypeDto.name);
                await this.tasksTypeRepository.create(this.tasksTypeMapper.mapAggregateToDataModel(taskTypeAggregate));
                res.status(HttpStatus.CREATED).send({ message: ResponseMessages.TYPE_CREATED_SUCCESSFULLY });
            }
        } catch (error) {
            if (error.type === DOMAIN_EXCEPTIONS_TYPE) {
                res.status(HttpStatus.BAD_REQUEST).send({ message: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: HttpErrors.INTERNAL_SERVER_ERROR });
            }
        }
    }
}