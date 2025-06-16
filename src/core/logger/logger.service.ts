import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import pino from 'pino';

@Injectable()
export class LoggerService implements NestLoggerService {
    private logger: pino.Logger;

    constructor() {
        this.logger = pino({
            transport: {
                target: 'pino-pretty',
                options: {
                    singleLine: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname',
                },
            },
        });
    }

    log(message: string, context?: string) {
        this.logger.info({ context }, message);
    }

    error(message: string, trace?: any, context?: string) {
        this.logger.error({ context, trace }, message);
    }

    warn(message: string, context?: string) {
        this.logger.warn({ context }, message);
    }

    debug(message: string, context?: string) {
        this.logger.debug({ context }, message);
    }

    verbose(message: string, context?: string) {
        this.logger.trace({ context }, message);
    }
} 