import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { AnalyzeRequestDto, AnalyzeResponseDto, ChatMessageResponseDto, ChatRequestDto } from '../dto/chat.dtos';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }


  @Post('message')
  @ApiOperation({ summary: 'Send a message to the AI' })
  @ApiResponse({ status: 200, description: 'Send a message to the AI', type: ChatMessageResponseDto })
  message(@Body() chatRequestDto: ChatRequestDto) {
    return this.chatService.message(chatRequestDto);
  }

  //stream
  @Post('stream')
  @ApiOperation({ summary: 'Stream a message to the AI' })
  @ApiResponse({ status: 200, description: 'Stream a message to the AI', type: ChatMessageResponseDto })
  stream(@Body() chatRequestDto: ChatRequestDto) {
    return this.chatService.stream(chatRequestDto);
  }

  @Post('analyze-strategy')
  @ApiOperation({ summary: 'Analyze a strategy' })
  @ApiResponse({ status: 200, description: 'Analyze a strategy', type: AnalyzeResponseDto })
  analyzeStrategy(@Body() analyzeRequestDto: AnalyzeRequestDto) {
    return this.chatService.analyzeStrategy(analyzeRequestDto);
  }
}
