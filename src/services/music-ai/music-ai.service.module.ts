import { Module } from "@nestjs/common";
import { MUSIC_AI_PROVIDER, MusicAiServiceProvider } from "./music-ai.service.provider";
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigModule } from "../../config/config.module";
import { AppConfigService } from "src/config/config.service";
import { PinoLogger } from "nestjs-pino";
import { MusicAiConfig } from "src/config/interfaces/config.interface";

@Module({
    imports: [HttpModule, ConfigModule],
    providers: [{
        inject: [AppConfigService, PinoLogger, HttpService],
        provide: MUSIC_AI_PROVIDER,
        useFactory: (configService: AppConfigService, logger: PinoLogger, httpService: HttpService): MusicAiServiceProvider | undefined => {
            logger.setContext(MusicAiServiceProvider.name);
            const musicAiConfig = configService.get<MusicAiConfig>('musicAi');
            if (!musicAiConfig.apiKey) {
                logger.warn('Music AI API key not found');
                return undefined;
            }
            return new MusicAiServiceProvider(httpService, logger, musicAiConfig.apiKey, musicAiConfig.baseUrl);
        }
    }],
    exports: [MUSIC_AI_PROVIDER],
})
export class MusicAiServiceModule { }