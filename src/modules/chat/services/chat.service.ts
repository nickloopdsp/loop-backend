import { Inject, Injectable } from '@nestjs/common';
import { ChatRequestDto, ChatMessageResponseDto, AnalyzeRequestDto, AnalyzeResponseDto } from '../dto/chat.dtos';
import { OpenAiConfig } from '../../../config/interfaces/config.interface';
import { AppConfigService } from '../../../config/config.service';
import { OpenAIProvider } from '../../../core/providers/openai/openai.provider';
import { AIMessage } from '../../../core/interfaces';

@Injectable()
export class ChatService {


  constructor(private readonly configService: AppConfigService,
    private readonly openaiProvider: OpenAIProvider
  ) {

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

    return {
      message: 'Ai Message',
      timestamp: new Date().toISOString()
    }
  }

  async analyzeStrategy(analyzeRequestDto: AnalyzeRequestDto): Promise<AnalyzeResponseDto> {
    return {
      score: 0.8,
      strengths: ['Strong marketing strategy', 'Good use of data'],
      improvements: ['Improve marketing strategy', 'Use more data'],
      insights: 'The document is a good marketing strategy'
    }
  }
}
