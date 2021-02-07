import {
    Body, Controller, Get, HttpStatus, Inject, Injectable,
    Post, Query, UploadedFile, UseInterceptors
} from '@nestjs/common';
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
import { S3Service } from '../infrastructrue/file-upload/aws-upload.service';
import { TaskTypeQueryDTO } from './DTOs/task-type-query.dto';

@Controller('task-types')
@Injectable()
export class TaskTypeController {

    constructor(
        @Inject(ITasksTypeReposiroty_DI_TOKEN) private readonly tasksTypeRepository: ITasksTypeRepository,
        @Inject(IAggregateDataModelMapper_DI_TOKEN) private readonly tasksTypeMapper: IAggregateDataModelMapper<TaskTypeAggregate, TasksTypeDataModel>,
        @Inject(IDomainEntityDataModelMapper_DI_TOKEN) private readonly typeImageMapper: TypeImageMapper,
        private s3Service: S3Service
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                filename: new FileNamingService().fileNaming
            }),
            fileFilter: (new FileFilterService(VALID_IMAGE_FORMATS, INVALID_IMAGE_FORMAT_ERROR).fileFilter),
            limits: { fileSize: 1024 * 1024 * 3 },
        }))
    async createTaskType(@UploadedFile() file: Express.Multer.File, @Body() taskTypeDto: TaskTypeDTO, @Res() res: Response) {
        try {
            if (file) {
                const imageDomainEntity: ImageDomainEntity = new ImageDomainEntity(file.destination, file.filename, file.originalname, file.mimetype);
                const taskTypeAggregate: TaskTypeAggregate = new TaskTypeAggregate(taskTypeDto.name, imageDomainEntity);
                const taskTypeDataModel: TasksTypeDataModel = this.tasksTypeMapper.mapAggregateToDataModel(taskTypeAggregate);
                const imageDataModel: ImageDataModel = this.typeImageMapper.mapDomainEntityToDataModel(taskTypeAggregate.typeImage());
                //TODO change blocking upload with workers and queues
                //TODO change imageDomainEntity and imageDataModel to save isUploadedToS3
                //TODO change unit Tests to match with new changes
                this.s3Service.uploadImage(imageDomainEntity.getImageTempPath(), imageDomainEntity.getImageKeyName(), imageDomainEntity.getImageMimeType())
                    .then(() => {
                        this.tasksTypeRepository.createWithImage(taskTypeDataModel, imageDataModel);
                        res.status(HttpStatus.CREATED).send({ message: ResponseMessages.TYPE_CREATED_SUCCESSFULLY });
                    }).catch((err) => {
                        console.log(err);
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: HttpErrors.INTERNAL_SERVER_ERROR });
                    });
            } else {
                const taskTypeAggregate: TaskTypeAggregate = new TaskTypeAggregate(taskTypeDto.name);
                this.tasksTypeRepository.create(this.tasksTypeMapper.mapAggregateToDataModel(taskTypeAggregate));
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

    @Get()
    async getTaskType(@Query() query: TaskTypeQueryDTO, @Res() res: Response) {
        try {
            let types: TasksTypeDataModel[] = await this.tasksTypeRepository.getTypesByName(query.name);
            if (!types || !types.length) return res.status(HttpStatus.OK).send([]);
            let types1 = types.map((type) => {
                return {
                    name: type.name,
                    imageURL: this.s3Service.getImagePreSignedURL(type.image.keyName)
                }
            })
            res.status(HttpStatus.OK).send(types1);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: HttpErrors.INTERNAL_SERVER_ERROR });
        }

    }
}