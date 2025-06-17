import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsObject, IsOptional, IsString } from "class-validator";

export class UploadUrlsDto {
    @ApiProperty({
        description: 'The upload URL',
        example: 'https://example.com/upload'
    })
    @IsString()
    uploadUrl: string;

    @ApiProperty({
        description: 'The download URL',
        example: 'https://example.com/download'
    })
    @IsString()
    downloadUrl: string;
}

export class WorkflowDto {
    @ApiProperty({
        description: 'The ID of the workflow',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'The name of the workflow',
        example: 'My Workflow'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The slug of the workflow',
        example: 'my-workflow'
    })
    @IsString()
    slug: string;

    @ApiProperty({
        description: 'The description of the workflow',
        example: 'My Workflow Description'
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'The created at of the workflow',
        example: '2021-01-01'
    })
    @IsString()
    createdAt: string;

    @ApiProperty({
        description: 'The updated at of the workflow',
        example: '2021-01-01'
    })
    @IsString()
    updatedAt: string;
}

export class WorkflowParamDto {
    @ApiProperty({
        description: 'The input URL',
        example: 'https://example.com/input'
    })
    @IsString()
    inputUrl: string;

}

export class CreateJobRequestDto {

    @ApiProperty({
        description: 'The name of the job',
        example: 'My Job'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The workflow',
        example: 'my-workflow'
    })
    @IsString()
    workflow: string;

    @ApiProperty({
        description: 'The params of the job',
        example: {
            inputUrl: 'https://example.com/input'
        }
    })
    @IsObject()
    params: WorkflowParamDto;

    @ApiProperty({
        description: 'The metadata of the job',
        example: {
            key: 'value'
        }
    })
    @IsObject()
    metadata?: Record<string, any>;

}

export class CreateJobResponseDto {
    @ApiProperty({
        description: 'The ID of the job',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    id: string;
}

export enum JobStatus {
    QUEUED = 'QUEUED',
    STARTED = 'STARTED',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
}

export class JobErrorDto {
    @ApiProperty({
        description: 'The code of the error',
        example: 'PROCESSING_ERROR'
    })
    @IsString()
    code: string;

    @ApiProperty({
        description: 'The title of the error',
        example: 'Processing Failed'
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'The message of the error',
        example: 'Failed to process audio file'
    })
    @IsString()
    message: string;
}

export class JobDto {
    @ApiProperty({
        description: 'The ID of the job',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'The app of the job',
        example: 'music-ai'
    })
    @IsString()
    app: string;

    @ApiProperty({
        description: 'The workflow of the job',
        example: 'my-workflow'
    })
    @IsString()
    workflow: string;

    @ApiProperty({
        description: 'The status of the job',
        example: 'QUEUED'
    })
    @IsEnum(JobStatus)
    status: JobStatus;

    @ApiProperty({
        description: 'The batch name of the job',
        example: 'batch-2024-01'
    })
    @IsString()
    batchName?: string | null;

    @ApiProperty({
        description: 'The workflow params of the job',
        example: {
            inputUrl: 'https://example.com/input'
        }
    })
    @IsObject()
    workflowParams: WorkflowParamDto;

    @ApiPropertyOptional({
        description: 'The metadata of the job',
        example: {
            key: 'value'
        }
    })
    @IsObject()
    @IsOptional()
    metadata?: Record<string, any>;

    @ApiPropertyOptional({
        description: 'The result of the job',
        example: {
            outputUrl: 'https://example.com/output'
        }
    })
    @IsObject()
    @IsOptional()
    error?: JobErrorDto | null;

    @ApiProperty({
        description: 'The name of the job',
        example: 'My Job'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The created at of the job',
        example: '2021-01-01'
    })
    @IsString()
    createdAt: string;

    @ApiPropertyOptional({
        description: 'The started at of the job',
        example: '2021-01-01'
    })
    @IsString()
    @IsOptional()
    startedAt?: string | null;

    @ApiPropertyOptional({
        description: 'The completed at of the job',
        example: '2021-01-01'
    })
    @IsString()
    @IsOptional()
    completedAt?: string | null;
}

export class JobStatusDto {
    @ApiProperty({
        description: 'The ID of the job',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'The status of the job',
        example: 'QUEUED'
    })
    @IsEnum(JobStatus)
    status: JobStatus;
}

export class DeleteJobResponseDto {
    @ApiProperty({
        description: 'The ID of the job',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    id: string;
}