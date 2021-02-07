import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
const fs = require("fs");

import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME, AWS_S3_REGION } from '../../../shared-kernal/constants';

@Injectable()
export class S3Service {
    private readonly credintails: AWS.Credentials;
    private readonly s3: AWS.S3;

    constructor(private readonly configService: ConfigService) {

        this.credintails = new AWS.Credentials({
            accessKeyId: configService.get(AWS_ACCESS_KEY_ID),
            secretAccessKey: configService.get(AWS_SECRET_ACCESS_KEY)
        });
        this.s3 = new AWS.S3({
            credentials: this.credintails,
            region: configService.get(AWS_S3_REGION)
        })
    }

    listBucket = () => {
        const params = {
            Bucket: this.configService.get(AWS_S3_BUCKET_NAME),
            MaxKeys: 2
        };
        this.s3.listObjects(params, (err, data) => {
            if (err) console.log(err, err.stack);
            console.log(data);
        })
    }

    uploadImage = async (fileTempPath: string, fileName: string, mimeType: string) => {
        const fileStream = fs.createReadStream(fileTempPath);
        fileStream.on('error', (err: any) => {
            throw new Error(err);
        });

        const uploadParams = {
            Bucket: this.configService.get(AWS_S3_BUCKET_NAME),
            Key: `${fileName}`,
            Body: fileStream,
            ContentType: mimeType
        };

        // this.s3.putObject(uploadParams, (err, data) => {
        //     if (err) throw new Error('Upload faild');
        //     console.log(data);
        // })

        return this.s3.putObject(uploadParams).promise();
    }

    getImagePreSignedURL = (imageName: string) => {
        const params = {
            Bucket: this.configService.get(AWS_S3_BUCKET_NAME),
            Key: `${imageName}`,
            Expires: 120
        }
        return this.s3.getSignedUrl('getObject', params);
    }

}