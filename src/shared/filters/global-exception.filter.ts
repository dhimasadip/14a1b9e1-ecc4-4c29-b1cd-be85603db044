import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { JoiPipeValidationException } from 'nestjs-joi';
import { DatabaseError, ValidationError } from 'sequelize';
import { FilterResponseBodyFormat } from './interfaces/filter-response-body-format';
import { handleJoiPipeError } from './utils/handle-joi-pipe-error';
import { handleNestError } from './utils/handle-nest-error';
import { handleSequelizeDatabaseError } from './utils/handle-sequelize-database-error';
import { handleSequelizeValidationError } from './utils/handle-sequelize-validation-error';
import { parseError } from '../utils/parse.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();

    let responseBody: FilterResponseBodyFormat = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: (exception as any).message?.message || 'Unhandled error',
      code: 'HttpException',
      success: false,
    };

    const { httpAdapter } = this.httpAdapterHost;

    if (exception instanceof ValidationError) {
      responseBody = handleSequelizeValidationError(exception);
    } else if (exception instanceof DatabaseError) {
      responseBody = await handleSequelizeDatabaseError(exception);
    } else if (exception instanceof HttpException) {
      responseBody = handleNestError(exception);
    } else if (exception instanceof JoiPipeValidationException) {
      responseBody = handleJoiPipeError(exception);
    } else if (
      exception instanceof Error &&
      (exception.name === 'ReferenceError' || exception.name === 'TypeError')
    ) {
      const error = parseError(exception);

      console.error(error);

      process.exit(1);
    }

    console.log(exception);

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.status);
  }
}
