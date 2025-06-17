import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { BaseAIProvider } from '../../base/base.ai.provider';
import { AIContextDto } from '../../../modules/chat/dto/chat.dtos';
import { AppConfigService } from 'src/config/config.service';
import { OpenAiConfig } from 'src/config/interfaces/config.interface';
import { AIMessage } from '../../interfaces';

@Injectable()
export class OpenAIProvider implements BaseAIProvider {
    private openai: OpenAI;
    private models: string[];
    private maxTokens: number;
    private temperature: number;
    constructor(
        private readonly configService: AppConfigService
    ) {
        const openAiConfig = this.configService.get<OpenAiConfig>('openai');
        this.openai = new OpenAI({
            apiKey: openAiConfig.apiKey,
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

        // Try each model in order until one works
        let lastError: any;

        for (const model of this.models) {
            try {
                console.log(`Attempting OpenAI API call with model: ${model}`);
                const completion = await this.openai.chat.completions.create({
                    model: model,
                    messages: allMessages,
                    max_tokens: this.maxTokens,
                    temperature: this.temperature,
                });

                return (
                    completion.choices[0]?.message?.content ||
                    "I apologize, but I was unable to generate a response."
                );
            } catch (error: any) {
                console.error(`OpenAI API error with model ${model}:`, error.message);
                lastError = error;

                // If it's a quota error, don't try other models
                if (error.code === "insufficient_quota" || error.status === 402) {
                    throw new Error(
                        "Your OpenAI account has insufficient credits. Please add credits at https://platform.openai.com/account/billing"
                    );
                }

                // If it's not a model not found error, throw it
                if (error.code !== "model_not_found") {
                    throw this.formatError(error, model);
                }

                // Otherwise, try the next model
                console.log(`Model ${model} not available, trying next model...`);
            }
        }

        // If we've tried all models and none worked
        throw this.formatError(lastError, this.models[this.models.length - 1]);
    }

    async *generateStreamingResponse(messages: AIMessage[], context?: AIContextDto): AsyncGenerator<string> {
        try {
            const systemMessage = this.buildSystemMessage(context);
            const allMessages = [
                { role: "system" as const, content: systemMessage },
                ...messages,
            ];

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
            console.error("OpenAI streaming error:", error);
            throw new Error("Failed to generate streaming response");
        }
    }

    private formatError(error: any, model: string): Error {
        console.error("Error details:", {
            status: error.status,
            message: error.message,
            code: error.code,
            type: error.type,
        });

        // Provide more specific error messages
        if (error.status === 404 && error.code === "model_not_found") {
            return new Error(
                `Model "${model}" not found. Please check your API key permissions.`
            );
        } else if (error.status === 401) {
            return new Error("Invalid API key. Please check your OpenAI API key.");
        } else if (error.status === 429 && error.code === "insufficient_quota") {
            return new Error(
                "Your OpenAI account has insufficient credits. Please add credits at https://platform.openai.com/account/billing"
            );
        } else if (error.status === 429) {
            return new Error("Rate limit exceeded. Please try again later.");
        } else if (error.status === 402) {
            return new Error(
                "Insufficient credits. Please check your OpenAI account billing."
            );
        }

        return new Error("Failed to generate AI response. Please try again.");
    }

    private buildSystemMessage(context?: AIContextDto): string {
        let systemMessage = `You are MC (Music Concierge), an AI-powered music career assistant for independent artists. 
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

        if (context?.artistName) {
            systemMessage += `\n\nYou are currently assisting ${context.artistName}.`;
        }

        if (context?.artistStats) {
            systemMessage += `\n\nCurrent artist stats: ${JSON.stringify(
                context.artistStats
            )}`;
        }

        return systemMessage;
    }
} 