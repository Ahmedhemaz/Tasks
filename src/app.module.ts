import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedKernalModule } from './shared-kernal/shared-kernal.module';
import { ScheduleSubdomainModule } from './schedule-subdomain/schedule-subdomain.module';
import { TaskTypeSubdomainModule } from './task-type-subdomain/task-type-subdomain.module';
@Module({
  imports: [
    ScheduleSubdomainModule,
    TaskTypeSubdomainModule,
    TypeOrmModule.forRoot(),
    SharedKernalModule,
    MulterModule.register({
      dest: '/uploads'
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      cache: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
