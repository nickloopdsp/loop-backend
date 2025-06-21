import { Logger, Module } from "@nestjs/common";
import { OPENAI_PROVIDER, OpenAIProvider } from "./openai.provider";
import { AppConfigService, OpenAiConfig, ConfigModule } from "../../config";
import { BaseAIProvider } from "../../core/base";

@Module({
    imports: [ConfigModule],
    providers: [
        {
            inject: [AppConfigService],
            provide: OPENAI_PROVIDER,
            useFactory: (configService: AppConfigService): BaseAIProvider | undefined => {
                const logger = new Logger(OpenAIModule.name);
                const openAiConfig = configService.get<OpenAiConfig>('openai');
                if (!openAiConfig?.apiKey) {
                    logger.warn('OpenAI API key is not configured. AI features will be disabled.');
                    return undefined;
                }

                if (!openAiConfig.model) {
                    logger.warn('OpenAI model is not configured. Using default model: gpt-3.5-turbo');
                }

                logger.log("OpenAI service initialized successfully");

                return new OpenAIProvider(
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