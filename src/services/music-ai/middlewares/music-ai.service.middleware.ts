import { Inject, Injectable, NestMiddleware, ServiceUnavailableException } from "@nestjs/common";
import { MUSIC_AI_PROVIDER, MusicAiServiceProvider } from "../music-ai.service.provider";
import { NextFunction, Request, Response } from "express";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class MusicAiServiceMiddleware implements NestMiddleware {
    constructor(
        private readonly logger: PinoLogger,
        @Inject(MUSIC_AI_PROVIDER) private readonly musicAiServiceProvider: MusicAiServiceProvider) {
        this.logger.setContext(MusicAiServiceMiddleware.name);
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.info(`[${req.method}] ${req.path} - OpenAI middleware processing request`);

        if (!this.musicAiServiceProvider) {
            this.logger.error("Music AI service is not available. Please configure MUSIC_AI_API_KEY in your environment variables.");
            throw new ServiceUnavailableException({
                statusCode: 503,
                message: "Music AI service is not available.",
                error: "Service Unavailable"
            });
        }

        this.logger.info('Music AI provider is available, proceeding with request');
        next();
    }
}