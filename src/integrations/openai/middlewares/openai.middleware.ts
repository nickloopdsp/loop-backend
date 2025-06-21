import { BadRequestException, Inject, Injectable, NestMiddleware, Logger, ServiceUnavailableException } from "@nestjs/common";

import { NextFunction, Request, Response } from "express";
import { OPENAI_PROVIDER, OpenAIProvider } from "../openai.provider";

@Injectable()
export class OpenAIMiddleware implements NestMiddleware {
    private readonly logger = new Logger(OpenAIMiddleware.name);

    constructor(
        @Inject(OPENAI_PROVIDER)
        private readonly openaiProvider: OpenAIProvider | undefined
    ) {
        this.logger.log('OpenAIMiddleware initialized');
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(`[${req.method}] ${req.path} - OpenAI middleware processing request`);

        if (!this.openaiProvider) {
            this.logger.error("OpenAI service is not available. Please configure OPENAI_API_KEY in your environment variables.");
            throw new ServiceUnavailableException("OpenAI service is not available.");
        }

        this.logger.log('OpenAI provider is available, proceeding with request');
        next();
    }
}