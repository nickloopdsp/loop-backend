import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppConfigService } from './config/config.service';
import { RedDocsModule } from './core/redoc/redocs.module';
import { requestContextMiddleware } from '@medibloc/nestjs-request-context';
import { AppRequestContext, correlationIdMiddleware } from './core/middlewares/correlationid.middleware';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerConfig } from './config/interfaces/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    bodyParser: true,
  });

  const configService = app.get<AppConfigService>(AppConfigService);
  const loggerConfig = configService.get<LoggerConfig>('logger');

  console.log('Log Level', loggerConfig.level);
  console.log('Remote Log Destination', `${loggerConfig.logUrl}:${loggerConfig.port}`);
  console.log('Environment', process.env.NODE_ENV);


  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));


  app.enableCors({
    exposedHeaders: ['Content-Disposition'],
  })

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  app.use(requestContextMiddleware(AppRequestContext))
  app.use(correlationIdMiddleware)
  //app.use()


  // Swagger setup
  RedDocsModule.setup(app, configService);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
