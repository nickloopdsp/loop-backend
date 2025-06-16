import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validationSchema } from './config/env.validation';
import configuration from './config/configuration';
import { AppConfigService } from './config/config.service';
import { AppExceptionFilter } from './core/exceptions/app-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from './core/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [configuration],
    }),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService, {
    provide: APP_FILTER,
    useClass: AppExceptionFilter,
  }],
})
export class AppModule { }
