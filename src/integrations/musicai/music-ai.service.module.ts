import { Logger, Module } from "@nestjs/common";
import { MUSIC_AI_PROVIDER, MusicAiServiceProvider } from "./music-ai.service.provider";
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigModule, AppConfigService, MusicAiConfig } from "../../config";

@Module({
    imports: [HttpModule, ConfigModule],
    providers: [{
        inject: [AppConfigService, HttpService],
        provide: MUSIC_AI_PROVIDER,
        useFactory: (configService: AppConfigService, httpService: HttpService): MusicAiServiceProvider | undefined => {
            const logger = new Logger(MusicAiServiceModule.name);
            const musicAiConfig = configService.get<MusicAiConfig>('musicAi');
            if (!musicAiConfig.apiKey) {
                logger.warn('Music AI API key not found');
                return undefined;
            }
            return new MusicAiServiceProvider(httpService, musicAiConfig.apiKey, musicAiConfig.baseUrl);
        }
    }],
    exports: [MUSIC_AI_PROVIDER],
})
export class MusicAiServiceModule { }