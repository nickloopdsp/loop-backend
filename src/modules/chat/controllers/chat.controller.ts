import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { AnalyzeRequestDto, AnalyzeResponseDto, ChatMessageResponseDto, ChatRequestDto } from '../dto/chat.dtos';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService,
    private readonly logger: PinoLogger
  ) {
    this.logger.setContext(ChatController.name);
  }


  @Post('message')
  @ApiOperation({ summary: 'Send a message to the AI' })
  @ApiResponse({ status: 200, description: 'Send a message to the AI', type: ChatMessageResponseDto })
  @ApiResponse({ status: 402, description: 'Insufficient credits' })
  @ApiResponse({ status: 404, description: 'Model not found' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  @ApiResponse({ status: 429, description: 'Rate limit exceeded' })
  @ApiResponse({ status: 402, description: 'Insufficient credits' })
  @ApiResponse({ status: 503, description: 'OpenAI service is not available' })
  message(@Body() chatRequestDto: ChatRequestDto) {
    return this.chatService.message(chatRequestDto);
  }

  @Post('stream')
  @ApiOperation({ summary: 'Stream a message to the AI' })
  @ApiResponse({ status: 200, description: 'Stream a message to the AI', type: ChatMessageResponseDto })
  @ApiResponse({ status: 402, description: 'Insufficient credits' })
  @ApiResponse({ status: 404, description: 'Model not found' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  @ApiResponse({ status: 429, description: 'Rate limit exceeded' })
  @ApiResponse({ status: 402, description: 'Insufficient credits' })
  @ApiResponse({ status: 503, description: 'OpenAI service is not available' })
  async stream(@Body() chatRequestDto: ChatRequestDto, @Res() res: Response) {
    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      for await (const chunk of this.chatService.stream(
        chatRequestDto
      )) {
        res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error) {
      this.logger.error("AI streaming error:", error);
      throw new Error("Failed to stream response. Please try again.");
    }
  }

  @Post('analyze-strategy')
  @ApiOperation({ summary: 'Analyze a strategy' })
  @ApiResponse({ status: 200, description: 'Analyze a strategy', type: AnalyzeResponseDto })
  @ApiResponse({ status: 402, description: 'Insufficient credits' })
  @ApiResponse({ status: 404, description: 'Model not found' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  @ApiResponse({ status: 429, description: 'Rate limit exceeded' })
  @ApiResponse({ status: 402, description: 'Insufficient credits' })
  @ApiResponse({ status: 503, description: 'OpenAI service is not available' })
  analyzeStrategy(@Body() analyzeRequestDto: AnalyzeRequestDto) {
    return this.chatService.analyzeStrategy(analyzeRequestDto);
  }
}
