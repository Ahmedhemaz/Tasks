import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleSubdomainModule } from './schedule-subdomain/schedule-subdomain.module';
import { TaskTypeSubdomainModule } from './task-type-subdomain/task-type-subdomain.module';

@Module({
  imports: [ScheduleSubdomainModule, TaskTypeSubdomainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
