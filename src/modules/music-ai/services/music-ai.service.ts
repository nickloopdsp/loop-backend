import { Injectable } from '@nestjs/common';
import { UploadUrlsDto, WorkflowDto } from '../dto/music-ai.dtos';
import { MusicAiProvider } from '../../ai/musicai.provider';

@Injectable()
export class MusicAiService {

  constructor(
    private readonly aiProvider: MusicAiProvider
  ) { }

  async getUploadUrls(): Promise<UploadUrlsDto[]> {
    return this.aiProvider.getUploadUrls();
  }

  async getWorkflows(page: number, size: number): Promise<WorkflowDto[]> {
    const response = await this.aiProvider.getWorkflows(page, size);
    return response.workflows;
  }
}
