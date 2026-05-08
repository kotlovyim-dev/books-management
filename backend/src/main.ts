import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import type { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  const logger = new Logger('Bootstrap');
  const httpLogger = new Logger('HTTP');

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use((req: Request, res: Response, next) => {
    const start = Date.now();

    res.on('finish', () => {
      const durationMs = Date.now() - start;
      const contentLength = res.getHeader('content-length');
      const size = Array.isArray(contentLength)
        ? contentLength.join(',')
        : (contentLength?.toString() ?? '0');

      httpLogger.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${size} - ${durationMs}ms`,
      );
    });

    next();
  });

  process.on('unhandledRejection', (reason) => {
    logger.error(
      'Unhandled promise rejection',
      reason instanceof Error ? reason.stack : String(reason),
    );
  });

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception', error.stack ?? String(error));
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
