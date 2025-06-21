import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { CORRELATION_ID_HEADER_KEY } from "../../constants";
import { RequestContext } from "@medibloc/nestjs-request-context";

export class AppRequestContext extends RequestContext {
    correlationId: string
}



export function correlationIdMiddleware(req: Request, res: Response, next: NextFunction) {
    const correlationId = req.headers[CORRELATION_ID_HEADER_KEY] || uuidv4();
    req.headers[CORRELATION_ID_HEADER_KEY] = correlationId;

    const ctx: AppRequestContext = AppRequestContext.get();
    if (ctx) {
        ctx.correlationId = correlationId as string;
    }

    res.setHeader(CORRELATION_ID_HEADER_KEY, correlationId);
    next();
}