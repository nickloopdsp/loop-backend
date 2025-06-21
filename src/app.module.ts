import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigService } from './config/config.service';
import { AppExceptionFilter } from './core/exceptions/app-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from './core/logger/logger.module';
import { ThrottlerConfigModule } from './core/throttler/throttler.module';
import { ConfigModule } from './config/config.module';
import { ChatModule } from './modules/chat/chat.module';
import { DashboardLayoutModule } from './modules/dashboardlayout/dashboard-layout.module';
import { MusicAiModule } from './modules/musicai/music-ai.module';
import { MockModule } from './modules/mock/mock.module';
import { SoundChartModule } from './modules/soundchart/sound-chart.module';
import { WinstonModule } from 'nest-winston';
import { WinstonLoggerConfig } from './core/logger-config/winston.logger.config';

@Module({
  imports: [
    ConfigModule,
    WinstonModule.forRootAsync({
      useClass: WinstonLoggerConfig,
      inject: [AppConfigService],
    }),
    LoggerModule,
    ThrottlerConfigModule,
    MockModule,
    ChatModule,
    DashboardLayoutModule,
    MusicAiModule,
    SoundChartModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppConfigService,
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule { }
