import { Logger, Module } from "@nestjs/common";
import { SOUNDCHARTS_PROVIDER, SoundChartServiceProvider } from "./soundchart.service.provider";
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigModule } from "../../config/config.module";
import { AppConfigService } from "src/config/config.service";
import { SoundChartConfig } from "src/config/interfaces/config.interface";

@Module({
    imports: [HttpModule, ConfigModule],
    providers: [{
        inject: [AppConfigService, HttpService],
        provide: SOUNDCHARTS_PROVIDER,
        useFactory: (configService: AppConfigService, httpService: HttpService): SoundChartServiceProvider | undefined => {
            const logger = new Logger(SoundChartServiceModule.name);
            const soundChartConfig = configService.get<SoundChartConfig>('soundChart');
            if (!soundChartConfig.apiKey) {
                logger.warn('SoundChart API key not found.');
                return undefined;
            }
            logger.log("SoundChart service initialized successfully");
            return new SoundChartServiceProvider(httpService, soundChartConfig);
        }
    }],
    exports: [SOUNDCHARTS_PROVIDER],
})
export class SoundChartServiceModule { }