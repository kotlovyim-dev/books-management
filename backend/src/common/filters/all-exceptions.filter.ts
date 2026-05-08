import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const method = request.method;
    const url = request.originalUrl ?? request.url;

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responseBody = exception.getResponse();
      const { message, error } = this.normalizeHttpException(responseBody);

      const logMessage = `${method} ${url} ${status} - ${message}`;
      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(
          logMessage,
          exception instanceof Error ? exception.stack : undefined,
        );
      } else {
        this.logger.warn(logMessage);
      }

      response.status(status).json({
        statusCode: status,
        message,
        error,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    const prismaCode = this.getPrismaCode(exception);
    if (prismaCode) {
      const mapped = this.mapPrismaError(prismaCode);
      this.logger.warn(
        `Prisma ${prismaCode} ${method} ${url} ${mapped.status} - ${mapped.message}`,
      );
      response.status(mapped.status).json({
        statusCode: mapped.status,
        message: mapped.message,
        error: mapped.error,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    this.logger.error(
      `${method} ${url} - Unhandled exception`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unexpected error occurred',
      error: 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private normalizeHttpException(responseBody: unknown) {
    if (typeof responseBody === 'string') {
      return { message: responseBody, error: 'Error' };
    }

    if (typeof responseBody === 'object' && responseBody !== null) {
      const body = responseBody as {
        message?: string | string[];
        error?: string;
      };
      const message = Array.isArray(body.message)
        ? body.message.join(', ')
        : (body.message ?? 'Request failed');

      return {
        message,
        error: body.error ?? 'Error',
      };
    }

    return { message: 'Request failed', error: 'Error' };
  }

  private mapPrismaError(code: string) {
    switch (code) {
      case 'P2002':
        return {
          status: HttpStatus.CONFLICT,
          message: 'Unique constraint failed',
          error: 'Conflict',
        };
      case 'P2025':
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Resource not found',
          error: 'Not Found',
        };
      default:
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Database request failed',
          error: 'Bad Request',
        };
    }
  }

  private getPrismaCode(exception: unknown) {
    if (typeof exception !== 'object' || exception === null) {
      return null;
    }

    const maybeError = exception as { code?: string };
    return typeof maybeError.code === 'string' ? maybeError.code : null;
  }
}
