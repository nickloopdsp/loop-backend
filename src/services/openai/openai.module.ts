import { Module } from "@nestjs/common";
import { OPENAI_PROVIDER, OpenAIProvider } from "./openai.provider";
import { AppConfigService } from "../../config/config.service";
import { OpenAiConfig } from "../../config/interfaces/config.interface";
import { BaseAIProvider } from "src/core/base";
import { PinoLogger } from "nestjs-pino";
import { ConfigModule } from "../../config/config.module";

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
                    logger.warn('OpenAI API key is not configured. AI features will be disabled.');
                    return undefined;
                }

                if (!openAiConfig.model) {
                    logger.warn('OpenAI model is not configured. Using default model: gpt-3.5-turbo');
                }

                return new OpenAIProvider(
                    logger,
                    openAiConfig.apiKey,
                    openAiConfig.model || "gpt-3.5-turbo",
                    openAiConfig.maxTokens || 1000,
                    openAiConfig.temperature || 0.7
                );
            }
        }
    ],
    exports: [OPENAI_PROVIDER],
})
export class OpenAIModule { }