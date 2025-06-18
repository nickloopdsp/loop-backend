import { Controller, Get, Post, Body, Delete, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateJobRequestDto, CreateJobResponseDto, DeleteJobResponseDto, JobDto, JobStatusDto } from '../dto/music-ai.dtos';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MusicAiJobService } from '../services/music-ai.job.service';

@ApiTags('Music AI Jobs')
@ApiBearerAuth()
@Controller('musicai/jobs')
export class MusicAiJobController {
    constructor(private readonly musicAiJobService: MusicAiJobService) { }

    @Post()
    @ApiOperation({ summary: 'Create a job' })
    @ApiResponse({ status: 200, description: 'Create a job', type: CreateJobResponseDto })
    @ApiResponse({ status: 503, description: 'Music AI service is not available.' })
    createJob(@Body() createJobDto: CreateJobRequestDto) {
        return this.musicAiJobService.createJob(createJobDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a job' })
    @ApiResponse({ status: 200, description: 'Get a job', type: JobDto })
    @ApiResponse({ status: 503, description: 'Music AI service is not available.' })
    getJob(@Param('id', ParseUUIDPipe) id: string) {
        return this.musicAiJobService.getJob(id);
    }

    @Get(':id/status')
    @ApiOperation({ summary: 'Get a job status' })
    @ApiResponse({ status: 200, description: 'Get a job status', type: JobStatusDto })
    @ApiResponse({ status: 503, description: 'Music AI service is not available.' })
    getJobStatus(@Param('id', ParseUUIDPipe) id: string) {
        return this.musicAiJobService.getJobStatus(id);
    }

    @Get()
    @ApiOperation({ summary: 'Get jobs' })
    @ApiResponse({ status: 200, description: 'Get jobs', type: JobDto, isArray: true })
    @ApiResponse({ status: 503, description: 'Music AI service is not available.' })
    @ApiQuery({ name: 'status', type: String, required: false, example: 'QUEUED', isArray: true })
    @ApiQuery({ name: 'workflow', type: String, required: false, example: 'my-workflow', isArray: true })
    @ApiQuery({ name: 'batchName', type: String, required: false, example: 'batch-2024-01', isArray: true })
    @ApiQuery({ name: 'page', type: Number, required: false, example: 0 })
    @ApiQuery({ name: 'size', type: Number, required: false, example: 100 })
    getJobs(
        @Query('status') status: string[],
        @Query('workflow') workflow: string[],
        @Query('batchName') batchName: string,
        @Query('page') page: number = 0,
        @Query('size') size: number = 100
    ) {
        return this.musicAiJobService.getJobs(status, workflow, batchName, page, size);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a job' })
    @ApiResponse({ status: 200, description: 'Delete a job', type: DeleteJobResponseDto })
    @ApiResponse({ status: 503, description: 'Music AI service is not available.' })
    deleteJob(@Param('id', ParseUUIDPipe) id: string) {
        return this.musicAiJobService.deleteJob(id);
    }
} 