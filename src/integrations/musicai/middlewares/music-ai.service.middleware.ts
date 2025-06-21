import { Inject, Injectable, Logger, NestMiddleware, ServiceUnavailableException } from "@nestjs/common";
import { MUSIC_AI_PROVIDER, MusicAiServiceProvider } from "../music-ai.service.provider";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class MusicAiServiceMiddleware implements NestMiddleware {
    private readonly logger = new Logger(MusicAiServiceMiddleware.name);
    constructor(
        @Inject(MUSIC_AI_PROVIDER) private readonly musicAiServiceProvider: MusicAiServiceProvider) {
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(`[${req.method}] ${req.path} - OpenAI middleware processing request`);

        if (!this.musicAiServiceProvider) {
            this.logger.error("Music AI service is not available. Please configure MUSIC_AI_API_KEY in your environment variables.");
            throw new ServiceUnavailableException({
                statusCode: 503,
                message: "Music AI service is not available.",
                error: "Service Unavailable"
            });
        }

        this.logger.log('Music AI provider is available, proceeding with request');
        next();
    }
}