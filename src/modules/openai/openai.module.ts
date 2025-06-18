import { Module } from "@nestjs/common";
import { OPENAI_PROVIDER, OpenAIProvider } from "./openai.provider";
import { AppConfigService } from "../../config/config.service";
import { OpenAiConfig } from "../../config/interfaces/config.interface";
import { BaseAIProvider } from "src/core/base";
import { ConfigModule } from "@nestjs/config";
import { PinoLogger } from "nestjs-pino";

@Module({
    imports: [ConfigModule],
    providers: [
        {
            inject: [AppConfigService, PinoLogger],
            provide: OPENAI_PROVIDER,
            useFactory: (configService: AppConfigService, logger: PinoLogger): BaseAIProvider | undefined => {
                logger.setContext(OpenAIModule.name);
                const openAiConfig = configService.get<OpenAiConfig>('openai');
                if (!openAiConfig?.apiKey) {
                    logger.info('OpenAI API key is not configured');
                    return undefined;
                }
                return new OpenAIProvider(logger, openAiConfig.apiKey, openAiConfig.model, openAiConfig.maxTokens, openAiConfig.temperature);

            }
        }
    ],
    exports: [OPENAI_PROVIDER],
})
export class OpenAIModule { }