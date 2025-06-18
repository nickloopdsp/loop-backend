//want to create the check openai provider is initialized middleware

import { BadRequestException, Inject, Injectable, NestMiddleware, ServiceUnavailableException } from "@nestjs/common";
import { OPENAI_PROVIDER, OpenAIProvider } from "../../modules/ai/openai.provider";
import { NextFunction, Request, Response } from "express";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class OpenAIMiddleware implements NestMiddleware {
    constructor(
        private readonly logger: PinoLogger,
        @Inject(OPENAI_PROVIDER)
        private readonly openaiProvider: OpenAIProvider | undefined
    ) {
        this.logger.setContext(OpenAIMiddleware.name);
        this.logger.info('OpenAIMiddleware initialized');
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.info(`[${req.method}] ${req.path} - OpenAI middleware processing request`);

        if (!this.openaiProvider) {
            this.logger.error("OpenAI service is not available. Please configure OPENAI_API_KEY in your environment variables.");
            throw new ServiceUnavailableException({
                statusCode: 503,
                message: "OpenAI service is not available.",
                error: "Service Unavailable"
            });
        }

        this.logger.info('OpenAI provider is available, proceeding with request');
        next();
    }
}