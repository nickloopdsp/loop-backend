import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MockService } from '../services/mock.service';
import { MockTrendingDto, MockHealthMetricsDto, MockGeoDataDto, MockTodoDto, MockChatMessageDto } from '../dto/mock.dtos';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Mock')
@ApiBearerAuth()
@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) { }

  @Get('health-metrics')
  @ApiOperation({ summary: 'Get health metrics' })
  @ApiResponse({ status: 200, description: 'Get health metrics', type: MockHealthMetricsDto })
  getHealthMetrics() {
    return this.mockService.getHealthMetrics();
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get trending' })
  @ApiResponse({ status: 200, description: 'Get trending', type: MockTrendingDto, isArray: true })
  getTrending() {
    return this.mockService.getTrending();
  }

  @Get('geo-data')
  @ApiOperation({ summary: 'Get geo data' })
  @ApiResponse({ status: 200, description: 'Get geo data', type: MockGeoDataDto })
  getGeoData() {
    return this.mockService.getGeoData();
  }

  @Get('todos')
  @ApiOperation({ summary: 'Get todos' })
  @ApiResponse({ status: 200, description: 'Get todos', type: MockTodoDto, isArray: true })
  getTodo() {
    return this.mockService.getTodos();
  }

  @Get('chat-messages')
  @ApiOperation({ summary: 'Get chat messages' })
  @ApiResponse({ status: 200, description: 'Get chat messages', type: MockChatMessageDto, isArray: true })
  getChatMessages() {
    return this.mockService.getChatMessages();
  }
}
