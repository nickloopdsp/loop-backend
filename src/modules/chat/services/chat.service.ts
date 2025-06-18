import { Inject, Injectable } from '@nestjs/common';
import { ChatRequestDto, ChatMessageResponseDto, AnalyzeRequestDto, AnalyzeResponseDto } from '../dto/chat.dtos';
import { OPENAI_PROVIDER, OpenAIProvider } from '../../../services/openai';
import { AIMessage } from '../../../core/interfaces';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class ChatService {


  constructor(
    @Inject(OPENAI_PROVIDER)
    private readonly openaiProvider: OpenAIProvider,
    private readonly logger: PinoLogger
  ) {
    this.logger.setContext(ChatService.name);
  }

  async message(chatRequestDto: ChatRequestDto): Promise<ChatMessageResponseDto> {

    const { message, conversationHistory = [], context = {} } = chatRequestDto;

    const messages: AIMessage[] = conversationHistory.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.message,
    }));

    messages.push({ role: "user", content: message });

    const response = await this.openaiProvider.generateResponse(messages, context);

    return {
      message: response,
      timestamp: new Date().toISOString()
    }
  }

  async *stream(chatRequestDto: ChatRequestDto) {
    const { message, conversationHistory = [], context = {} } = chatRequestDto;

    if (!this.openaiProvider.generateStreamingResponse) {
      throw new Error("Streaming not supported by current AI provider");
    }

    const messages: AIMessage[] = conversationHistory.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.message,
    }));

    // Add the new user message
    messages.push({ role: "user", content: message });

    yield* this.openaiProvider.generateStreamingResponse(messages, context);

  }

  async analyzeStrategy(analyzeRequestDto: AnalyzeRequestDto): Promise<AnalyzeResponseDto> {

    const { documentContent, documentType = "marketing" } = analyzeRequestDto;

    const messages: AIMessage[] = [
      {
        role: "user",
        content: `Please analyze this ${documentType} strategy document and provide:
                  1. An overall score out of 100
                  2. Key strengths (as a bullet list)
                  3. Areas for improvement (as a bullet list)
                  4. Strategic insights and recommendations
                  Document content:
                  ${documentContent}`,
      },
    ];

    const response = await this.openaiProvider.generateResponse(messages);

    //const { score, strengths, improvements, insights } = JSON.parse(response);

    return {
      score: 85, // This would be extracted from the AI response
      strengths: [
        "Strong creative concept with viral potential",
        "Well-defined target audience demographics",
        "Multi-platform approach",
      ],
      improvements: [
        "Consider extending campaign duration",
        "Include more micro-influencer partnerships",
        "Add A/B testing for creative variations",
      ],
      insights: response,
    }
  }
}
