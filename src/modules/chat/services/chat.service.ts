import { Injectable } from '@nestjs/common';
import { ChatRequestDto, ChatMessageResponseDto } from '../dto/chat.dtos';

@Injectable()
export class ChatService {

  async message(chatRequestDto: ChatRequestDto): Promise<ChatMessageResponseDto> {
    const { message, conversationHistory = [], context = {} } = chatRequestDto;

    return {
      message: 'Ai Message',
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
}
