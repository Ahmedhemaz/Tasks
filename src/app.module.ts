import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { SharedKernalModule } from './shared-kernal/shared-kernal.module';
import { ScheduleSubdomainModule } from './schedule-subdomain/schedule-subdomain.module';
import { TaskTypeSubdomainModule } from './task-type-subdomain/task-type-subdomain.module';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    ScheduleSubdomainModule,
    TaskTypeSubdomainModule,
    TypeOrmModule.forRoot(),
    SharedKernalModule,
    MulterModule.register({
      dest: '/uploads'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
