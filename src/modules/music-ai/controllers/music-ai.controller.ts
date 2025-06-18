import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MusicAiService } from '../services/music-ai.service';
import { UploadUrlsDto, WorkflowDto } from '../dto/music-ai.dtos';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Music AI')
@ApiBearerAuth()
@Controller('musicai')
export class MusicAiController {
  constructor(private readonly musicAiService: MusicAiService) { }

  @Get('upload')
  @ApiOperation({ summary: 'Get upload URLs' })
  @ApiResponse({ status: 200, description: 'Get upload URLs', type: UploadUrlsDto, isArray: true })
  @ApiResponse({ status: 503, description: 'Music AI service is not available.' })
  getUploadUrls() {
    return this.musicAiService.getUploadUrls();
  }

  @Get('workflows')
  @ApiOperation({ summary: 'Get workflows' })
  @ApiResponse({ status: 200, description: 'Get workflows', type: WorkflowDto, isArray: true })
  @ApiResponse({ status: 503, description: 'Music AI service is not available.' })
  @ApiQuery({ name: 'page', type: Number, required: false, example: 0 })
  @ApiQuery({ name: 'size', type: Number, required: false, example: 100 })
  getWorkflows(@Query('page') page: number = 0, @Query('size') size: number = 100) {
    return this.musicAiService.getWorkflows(page, size);
  }
}
