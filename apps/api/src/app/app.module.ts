import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { DatabaseModule } from 'src/database/database.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
