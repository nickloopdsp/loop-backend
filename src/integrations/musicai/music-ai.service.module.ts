import { Module } from "@nestjs/common";
import { MUSIC_AI_PROVIDER, MusicAiServiceProvider } from "./music-ai.service.provider";
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigModule, AppConfigService, MusicAiConfig } from "../../config";
import { PinoLogger } from "nestjs-pino";

@Module({
    imports: [HttpModule, ConfigModule],
    providers: [{
        inject: [AppConfigService, PinoLogger, HttpService],
        provide: MUSIC_AI_PROVIDER,
        useFactory: (configService: AppConfigService, logger: PinoLogger, httpService: HttpService): MusicAiServiceProvider | undefined => {
            logger.setContext(MusicAiServiceModule.name);
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