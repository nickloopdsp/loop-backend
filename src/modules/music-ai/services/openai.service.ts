import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
    private openai: OpenAI;
    private readonly logger = new Logger(OpenAIService.name);

    constructor(private readonly configService: ConfigService) { }

} 