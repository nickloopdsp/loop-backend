import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigService } from './config/config.service';
import { AppExceptionFilter } from './core/exceptions/app-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from './core/logger/logger.module';
import { ThrottlerConfigModule } from './core/throttler/throttler.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ThrottlerConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService, {
    provide: APP_FILTER,
    useClass: AppExceptionFilter,
  }],
})
export class AppModule { }
