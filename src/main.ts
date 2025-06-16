import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './config/config.service';
import { RedDocsModule } from './core/redoc/redocs.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get<AppConfigService>(AppConfigService);

  // Swagger setup
  RedDocsModule.setup(app, configService);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
