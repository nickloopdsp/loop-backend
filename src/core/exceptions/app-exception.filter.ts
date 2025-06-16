import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let error: any = null;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            message = errorResponse['message'] || exception.message;
            error = errorResponse['error'] || null;
        } else if (exception instanceof Error) {
            message = exception.message;
            error = { name: exception.name };
        }

        const errorResponse = {
            success: false,
            statusCode: status,
            message,
            error,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
        };

        // Log the error with stack trace
        this.logger.error(
            `${request.method} ${request.url}`,
            exception instanceof Error ? exception.stack : null,
            'ExceptionFilter',
        );

        response.status(status).json(errorResponse);
    }
} 