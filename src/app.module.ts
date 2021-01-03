import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleSubdomainModule } from './schedule-subdomain/schedule-subdomain.module';
import { TaskTypeSubdomainModule } from './task-type-subdomain/task-type-subdomain.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
@Module({
  imports: [
    ScheduleSubdomainModule,
    TaskTypeSubdomainModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
