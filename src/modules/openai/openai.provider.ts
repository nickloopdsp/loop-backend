import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { BaseAIProvider } from '../../core/base/base.ai.provider';
import { AIContextDto } from '../chat/dto/chat.dtos';
import { AppConfigService } from '../../config/config.service';
import { OpenAiConfig } from '../../config/interfaces/config.interface';
import { AIMessage } from '../../core/interfaces';
import { LoggerService } from '../../core/logger/logger.service';

@Injectable()
export class OpenAIProvider implements BaseAIProvider {
    private readonly openai: OpenAI;
    private readonly models: string[];
    private readonly maxTokens: number;
    private readonly temperature: number;

    constructor(
        private readonly configService: AppConfigService,
        private readonly logger: LoggerService,
    ) {
        const openAiConfig = this.configService.get<OpenAiConfig>('openai');
        this.openai = new OpenAI({
            apiKey: openAiConfig.apiKey,
            timeout: 30000, // 30 seconds timeout
        });
        this.models = [openAiConfig.model, "gpt-4o-mini", "gpt-3.5-turbo"];
        this.maxTokens = openAiConfig.maxTokens;
        this.temperature = openAiConfig.temperature;
    }

    async generateResponse(messages: AIMessage[], context?: AIContextDto): Promise<string> {
        const systemMessage = this.buildSystemMessage(context);
        const allMessages = [
            { role: "system" as const, content: systemMessage },
            ...messages,
        ];
        let lastError: any;

        for (const model of this.models) {
            try {
                this.logger.log(`Attempting OpenAI API call with model: ${model}`);
                const completion = await this.openai.chat.completions.create({
                    model,
                    messages: allMessages,
                    max_tokens: this.maxTokens,
                    temperature: this.temperature,
                });

                return completion.choices[0]?.message?.content || "I apologize, but I was unable to generate a response.";
            } catch (error: any) {
                this.logger.error(`OpenAI API error with model ${model}:`, error);
                lastError = error;

                if (error.code === "insufficient_quota" || error.status === 402) {
                    throw new Error("Your OpenAI account has insufficient credits. Please add credits at https://platform.openai.com/account/billing");
                }

                if (error.code !== "model_not_found") {
                    throw this.formatError(error, model);
                }

                this.logger.log(`Model ${model} not available, trying next model...`);
            }
        }

        throw this.formatError(lastError, this.models[this.models.length - 1]);
    }

    async *generateStreamingResponse?(messages: AIMessage[], context?: AIContextDto): AsyncGenerator<string> {
        const systemMessage = this.buildSystemMessage(context);
        const allMessages = [
            { role: "system" as const, content: systemMessage },
            ...messages,
        ];

        try {
            const stream = await this.openai.chat.completions.create({
                model: this.models[0],
                messages: allMessages,
                max_tokens: this.maxTokens,
                temperature: this.temperature,
                stream: true,
            });

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content;
                if (content) {
                    yield content;
                }
            }
        } catch (error) {
            this.logger.error("OpenAI streaming error:", error);
            throw this.formatError(error, this.models[0]);
        }
    }


    private formatError(error: any, model: string): Error {
        this.logger.error("Error details:", {
            status: error.status,
            message: error.message,
            code: error.code,
            type: error.type,
        });

        if (error.status === 404 && error.code === "model_not_found") {
            return new Error(`Model "${model}" not found. Please check your API key permissions.`);
        } else if (error.status === 401) {
            return new Error("Invalid API key. Please check your OpenAI API key.");
        } else if (error.status === 429 && error.code === "insufficient_quota") {
            return new Error("Your OpenAI account has insufficient credits. Please add credits at https://platform.openai.com/account/billing");
        } else if (error.status === 429) {
            return new Error("Rate limit exceeded. Please try again later.");
        } else if (error.status === 402) {
            return new Error("Insufficient credits. Please check your OpenAI account billing.");
        }

        return new Error("Failed to generate AI response. Please try again.");
    }

    private buildSystemMessage(context?: AIContextDto): string {
        const baseMessage = `You are MC (Music Concierge), an AI-powered music career assistant for independent artists. 
                            You provide expert advice on:
                            - Music promotion and marketing strategies
                            - Tour planning and venue recommendations
                            - Social media growth and engagement
                            - Revenue optimization across streaming, merch, and live performances
                            - Industry trends and data-driven insights
                            - Fan engagement and community building

                            Your responses should be:
                            - Professional yet friendly and encouraging
                            - Data-driven when possible
                            - Specific and actionable
                            - Tailored to independent artists' needs and budgets
                            - Aware of current music industry trends and platforms`;

        const contextParts: string[] = [];

        if (context?.artistName) {
            contextParts.push(`You are currently assisting ${context.artistName}.`);
        }

        if (context?.artistStats) {
            contextParts.push(`Current artist stats: ${JSON.stringify(context.artistStats)}`);
        }

        return contextParts.length > 0
            ? `${baseMessage}\n\n${contextParts.join('\n')}`
            : baseMessage;
    }
} 