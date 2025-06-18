import { Inject, Injectable, NestMiddleware, ServiceUnavailableException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { PinoLogger } from "nestjs-pino";
import { SOUNDCHARTS_PROVIDER, SoundChartServiceProvider } from "../soundchart.service.provider";

@Injectable()
export class SoundChartServiceMiddleware implements NestMiddleware {
    constructor(private readonly logger: PinoLogger, @Inject(SOUNDCHARTS_PROVIDER) private readonly soundChartServiceProvider: SoundChartServiceProvider) {
        this.logger.setContext(SoundChartServiceMiddleware.name);
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.info(`[${req.method}] ${req.path} - SoundChart middleware processing request`);

        if (!this.soundChartServiceProvider) {
            this.logger.error("SoundChart service is not available. Please configure SOUNDCHARTS_API_KEY in your environment variables.");
            throw new ServiceUnavailableException({
                statusCode: 503,
                message: "SoundChart service is not available.",
                error: "Service Unavailable"
            });
        }

        this.logger.info('SoundChart provider is available, proceeding with request');
        next();
    }
}