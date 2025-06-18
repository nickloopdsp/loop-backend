import { Inject, Injectable } from '@nestjs/common';
import { UploadUrlsDto, WorkflowDto } from '../dto/music-ai.dtos';
import { MUSIC_AI_PROVIDER, MusicAiServiceProvider } from '../../../integrations/musicai';

@Injectable()
export class MusicAiService {

  constructor(
    @Inject(MUSIC_AI_PROVIDER)
    private readonly aiProvider: MusicAiServiceProvider
  ) { }

  async getUploadUrls(): Promise<UploadUrlsDto[]> {
    return this.aiProvider.getUploadUrls();
  }

  async getWorkflows(page: number, size: number): Promise<WorkflowDto[]> {
    const response = await this.aiProvider.getWorkflows(page, size);
    return response.workflows;
  }
}
