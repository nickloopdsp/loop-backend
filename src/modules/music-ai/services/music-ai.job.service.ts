import { Injectable } from "@nestjs/common";
import { CreateJobRequestDto, CreateJobResponseDto, JobDto, JobStatus, JobStatusDto, DeleteJobResponseDto } from "../dto/music-ai.dtos";
import { MusicAiProvider } from "../../ai/musicai.provider";

@Injectable()
export class MusicAiJobService {
    constructor(
        private readonly aiProvider: MusicAiProvider
    ) { }
    async createJob(createJobDto: CreateJobRequestDto): Promise<CreateJobResponseDto> {
        const newJob = await this.aiProvider.createJob(createJobDto);
        return newJob;
    }

    async getJob(id: string): Promise<JobDto> {
        const job = await this.aiProvider.getJob(id);
        return job;
    }

    async getJobStatus(id: string): Promise<JobStatusDto> {
        const jobStatus = await this.aiProvider.getJobStatus(id);
        return jobStatus;
    }

    async getJobs(status: string[], workflow: string[], batchName: string, page: number, size: number): Promise<JobDto[]> {
        const jobs = await this.aiProvider.getJobs({ status, workflow, batchName, page, size });
        return jobs;
    }

    async deleteJob(id: string): Promise<DeleteJobResponseDto> {
        const deletedJob = await this.aiProvider.deleteJob(id);
        return deletedJob;
    }
}