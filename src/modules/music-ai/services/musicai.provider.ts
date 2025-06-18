import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AppConfigService } from "../../../config/config.service";
import { MusicAiConfig } from "../../../config/interfaces/config.interface";
import { JobDto, UploadUrlsDto, WorkflowDto, WorkflowParamDto } from "../dto/music-ai.dtos";
import { PinoLogger } from "nestjs-pino";


@Injectable()
export class MusicAiProvider {
    constructor(private readonly httpService: HttpService, private readonly configService: AppConfigService, private readonly logger: PinoLogger) {
        this.logger.setContext(MusicAiProvider.name);
        const musicAiConfig = this.configService.get<MusicAiConfig>('musicAi');
        this.httpService.axiosRef.defaults.baseURL = musicAiConfig.baseUrl
        this.httpService.axiosRef.defaults.headers.common['Authorization'] = musicAiConfig.apiKey
        this.httpService.axiosRef.defaults.headers.common['Content-Type'] = 'application/json'

    }

    async getUploadUrls(): Promise<UploadUrlsDto[]> {
        try {
            const response = await this.httpService.axiosRef.get('/upload');
            return response.data;
        } catch (error: any) {
            this.logger.error('Error getting upload URLs:', error);
            throw new Error(error.response?.data?.error || 'Failed to get upload URLs');
        }
    }

    async getWorkflows(page: number = 0, size: number = 100): Promise<{ workflows: WorkflowDto[] }> {
        try {
            const response = await this.httpService.axiosRef.get('/workflow', {
                params: { page, size },
            });
            return response.data;
        } catch (error: any) {
            this.logger.error('Error fetching workflows:', error);
            throw new Error(error.response?.data?.error || 'Failed to fetch workflows');
        }
    }

    async createJob(params: {
        name: string;
        workflow: string;
        params: WorkflowParamDto;
        metadata?: Record<string, any>;
    }): Promise<{ id: string }> {
        try {
            const response = await this.httpService.axiosRef.post('/job', params);
            return response.data;
        } catch (error: any) {
            this.logger.error('Error creating job:', error);
            throw new Error(error.response?.data?.error || 'Failed to create job');
        }
    }

    async getJob(id: string): Promise<JobDto> {
        try {
            const response = await this.httpService.axiosRef.get(`/job/${id}`);
            return response.data;
        } catch (error: any) {
            this.logger.error('Error fetching job:', error);
            throw new Error(error.response?.data?.error || 'Failed to fetch job');
        }
    }

    async getJobStatus(id: string): Promise<{ id: string; status: string }> {
        try {
            const response = await this.httpService.axiosRef.get(`/job/${id}/status`);
            return response.data;
        } catch (error: any) {
            this.logger.error('Error fetching job status:', error);
            throw new Error(error.response?.data?.error || 'Failed to fetch job status');
        }
    }

    async getJobs(params?: {
        status?: string[];
        workflow?: string[];
        batchName?: string;
        page?: number;
        size?: number;
    }): Promise<JobDto[]> {
        try {
            const response = await this.httpService.axiosRef.get('/job', { params });
            return response.data;
        } catch (error: any) {
            this.logger.error('Error fetching jobs:', error);
            throw new Error(error.response?.data?.error || 'Failed to fetch jobs');
        }
    }

    async deleteJob(id: string): Promise<{ id: string }> {
        try {
            const response = await this.httpService.axiosRef.delete(`/job/${id}`);
            return response.data;
        } catch (error: any) {
            this.logger.error('Error deleting job:', error);
            throw new Error(error.response?.data?.error || 'Failed to delete job');
        }
    }
}