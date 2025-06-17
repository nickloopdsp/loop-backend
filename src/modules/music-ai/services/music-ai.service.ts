import { Injectable } from '@nestjs/common';
import { CreateJobRequestDto, CreateJobResponseDto, DeleteJobResponseDto, JobDto, JobStatus, JobStatusDto, UploadUrlsDto, WorkflowDto } from '../dto/music-ai.dtos';

@Injectable()
export class MusicAiService {
  async getUploadUrls(): Promise<UploadUrlsDto[]> {
    return [
      {
        uploadUrl: 'https://example.com/upload',
        downloadUrl: 'https://example.com/download'
      }
    ];
  }

  async getWorkflows(page: number, size: number): Promise<WorkflowDto[]> {
    return [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'My Workflow',
        slug: 'my-workflow',
        description: 'My Workflow Description',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
      }
    ];
  }

  async createJob(createJobDto: CreateJobRequestDto): Promise<CreateJobResponseDto> {
    return {
      id: '123e4567-e89b-12d3-a456-426614174000'
    };
  }

  async getJob(id: string): Promise<JobDto> {
    return {
      id: '123e4567-e89b-12d3-a456-426614174000',
      app: 'music-ai',
      workflow: 'my-workflow',
      status: JobStatus.QUEUED,
      batchName: 'batch-2024-01',
      workflowParams: {
        inputUrl: 'https://example.com/input'
      },
      name: 'My Job',
      createdAt: '2021-01-01',
      startedAt: '2021-01-01',
      completedAt: '2021-01-01'
    };
  }

  async getJobStatus(id: string): Promise<JobStatusDto> {
    return {
      id: '123e4567-e89b-12d3-a456-426614174000',
      status: JobStatus.QUEUED
    };
  }

  async getJobs(page: number, size: number): Promise<JobDto[]> {
    return [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        app: 'music-ai',
        workflow: 'my-workflow',
        status: JobStatus.QUEUED,
        batchName: 'batch-2024-01',
        workflowParams: {
          inputUrl: 'https://example.com/input'
        },
        name: 'My Job',
        createdAt: '2021-01-01',
        startedAt: '2021-01-01',
        completedAt: '2021-01-01'
      }
    ];
  }

  async deleteJob(id: string): Promise<DeleteJobResponseDto> {
    return {
      id: '123e4567-e89b-12d3-a456-426614174000'
    };
  }
}
