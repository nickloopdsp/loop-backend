import { Module } from "@nestjs/common";
import { SOUNDCHARTS_PROVIDER, SoundChartServiceProvider } from "./soundchart.service.provider";
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigModule } from "../../config/config.module";
import { AppConfigService } from "src/config/config.service";
import { PinoLogger } from "nestjs-pino";
import { SoundChartConfig } from "src/config/interfaces/config.interface";

@Module({
    imports: [HttpModule, ConfigModule],
    providers: [{
        inject: [AppConfigService, PinoLogger, HttpService],
        provide: SOUNDCHARTS_PROVIDER,
        useFactory: (configService: AppConfigService, logger: PinoLogger, httpService: HttpService): SoundChartServiceProvider | undefined => {
            logger.setContext(SoundChartServiceModule.name);
            const soundChartConfig = configService.get<SoundChartConfig>('soundChart');
            if (!soundChartConfig.apiKey) {
                logger.warn('SoundChart API key not found.');
                return undefined;
            }
            logger.info("SoundChart service initialized successfully");
            return new SoundChartServiceProvider(httpService, logger, soundChartConfig);
        }
    }],
    exports: [SOUNDCHARTS_PROVIDER],
})
export class SoundChartServiceModule { }