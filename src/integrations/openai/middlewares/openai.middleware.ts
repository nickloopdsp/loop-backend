import { Inject, Injectable, NestMiddleware, ServiceUnavailableException } from "@nestjs/common";

import { NextFunction, Request, Response } from "express";
import { PinoLogger } from "nestjs-pino";
import { OPENAI_PROVIDER, OpenAIProvider } from "../openai.provider";

@Injectable()
export class OpenAIMiddleware implements NestMiddleware {
    constructor(
        private readonly logger: PinoLogger,
        @Inject(OPENAI_PROVIDER)
        private readonly openaiProvider: OpenAIProvider | undefined
    ) {
        this.logger.setContext(OpenAIMiddleware.name);
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