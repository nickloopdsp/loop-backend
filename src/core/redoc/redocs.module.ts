import { Module, INestApplication } from '@nestjs/common';
import { SwaggerModule as NestSwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { AppConfigService } from '../../config/config.service';
import { FeatureFlagsConfig } from '../../config/interfaces/config.interface';
import { Request, Response } from 'express';

@Module({})
export class RedDocsModule {
  static setup(app: INestApplication, configService: AppConfigService): void {
    const featureFlags = configService.get<FeatureFlagsConfig>('featureFlags');
    const isSwaggerEnabled = featureFlags.enableSwagger;

    if (!isSwaggerEnabled) {
      return;
    }

    const options = new DocumentBuilder()
      .setTitle('Loop API')
      .setDescription(`
        Welcome to the Loop API documentation. This API provides a comprehensive set of endpoints.
      `)
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'access-token',
      )
      .addApiKey(
        {
          type: 'apiKey',
          name: 'x-api-key',
          in: 'header',
          description: 'API key for external service authentication',
        },
        'api-key',
      )
      .setContact('Support Team', 'https://github.com/nickloopdsp/loop-backend', 'support@example.com')
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .addServer('http://localhost:3001', 'Development')
      .addServer('https://loop.com', 'Production')
      .build();

    const document = NestSwaggerModule.createDocument(app, options);

    // Custom Swagger UI options
    const customOptions = {
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        tryItOutEnabled: true,
        docExpansion: 'list',
        defaultModelsExpandDepth: 3,
        defaultModelExpandDepth: 3,
        syntaxHighlight: {
          theme: 'monokai'
        }
      },
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: `Loop API Documentation`,
      customfavIcon: '/favicon.ico'
    };

    // Setup Swagger UI
    NestSwaggerModule.setup('api/docs', app, document, customOptions);

    // Setup ReDoc
    const redocPath = 'redocs';
    app.use(`/${redocPath}`, (req: Request, res: Response) => {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Loop API Documentation</title>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: 'Roboto', sans-serif;
              }
              redoc {
                display: block;
                height: 100vh;
              }
            </style>
          </head>
          <body>
            <redoc spec-url='api/docs-json'></redoc>
            <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
          </body>
        </html>
      `);
    });

    // Serve OpenAPI spec for Redoc
    app.use(`/${redocPath}/spec.json`, (req: Request, res: Response) => {
      res.json(document);
    });
  }
} 