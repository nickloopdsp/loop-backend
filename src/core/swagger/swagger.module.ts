import { Module } from '@nestjs/common';
import { SwaggerModule as NestSwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AppConfigService, FeatureFlagsConfig } from '../../config';

@Module({})
export class SwaggerModule {
    static setup(app: INestApplication, configService: AppConfigService): void {
        const featureFlags = configService.get<FeatureFlagsConfig>('featureFlags');
        const isSwaggerEnabled = featureFlags.enableSwagger;

        if (!isSwaggerEnabled) {
            return;
        }

        const options = new DocumentBuilder()
            .setTitle('Loop API')
            .setDescription('API Documentation for Loop')
            .setVersion('1.0')
            .addBearerAuth()
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
            },
            customSiteTitle: `Loop API Documentation`,
        };

        NestSwaggerModule.setup('api/docs', app, document, customOptions);
    }
} 