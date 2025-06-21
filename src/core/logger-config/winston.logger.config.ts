import { Injectable } from "@nestjs/common";
import { AppConfigService, LoggerConfig } from "../../config";
import { WinstonModuleOptions, WinstonModuleOptionsFactory, utilities as nestModuleWinstonUtilities } from "nest-winston";
import * as WinstonGrayLog2 from "winston-graylog2";
import TransportStream from "winston-transport";
import * as winston from 'winston'
import { AppRequestContext } from "../middlewares/correlationid.middleware";

@Injectable()
export class WinstonLoggerConfig implements WinstonModuleOptionsFactory {
    constructor(private readonly configService: AppConfigService) {

    }

    createWinstonModuleOptions(): WinstonModuleOptions {
        const loggerConfig = this.configService.get<LoggerConfig>('logger');

        const grayLog2Options: WinstonGrayLog2.TransportOptions = {
            name: 'GrayLog',
            level: loggerConfig.level || 'info',
            silent: false,
            handleExceptions: true,
            graylog: {
                servers: [
                    {
                        host: loggerConfig.logUrl,
                        port: parseInt(loggerConfig.port, 10),
                    }
                ],
                facility: 'loop-backend',
                bufferSize: 1400,
            }

        }
        const grayLog2Transport = new WinstonGrayLog2(grayLog2Options) as TransportStream;
        const consoleTransport = new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                nestModuleWinstonUtilities.format.nestLike(),
            )
        })

        let transport: TransportStream[] = [consoleTransport]; // always log to console
        if ('development' === process.env.NODE_ENV) {
            console.log('Local Development (base on NODE_ENV) determined, not logging remote')
        } else {
            console.log('Remote Logging (base on NODE_ENV) determined, logging remote')
            transport.push(grayLog2Transport)
        }

        const winstonModuleOptions: WinstonModuleOptions = {
            defaultMeta: {
                env: process.env.NODE_ENV,
                get correlationId() {
                    const ctx: AppRequestContext = AppRequestContext.get();
                    return ctx?.correlationId;
                }
            },
            exitOnError: false,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            transports: transport,
            level: loggerConfig.level || 'info',
        }

        return winstonModuleOptions;
    }
}