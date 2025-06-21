import { Inject, Injectable, Logger, NestMiddleware, ServiceUnavailableException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { SOUNDCHARTS_PROVIDER, SoundChartServiceProvider } from "../soundchart.service.provider";

@Injectable()
export class SoundChartServiceMiddleware implements NestMiddleware {
    private readonly logger = new Logger(SoundChartServiceMiddleware.name);
    constructor(@Inject(SOUNDCHARTS_PROVIDER) private readonly soundChartServiceProvider: SoundChartServiceProvider) {

    }

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(`[${req.method}] ${req.path} - SoundChart middleware processing request`);

        if (!this.soundChartServiceProvider) {
            this.logger.error("SoundChart service is not available. Please configure SOUNDCHARTS_API_KEY in your environment variables.");
            throw new ServiceUnavailableException({
                statusCode: 503,
                message: "SoundChart service is not available.",
                error: "Service Unavailable"
            });
        }

        this.logger.log('SoundChart provider is available, proceeding with request');
        next();
    }
}