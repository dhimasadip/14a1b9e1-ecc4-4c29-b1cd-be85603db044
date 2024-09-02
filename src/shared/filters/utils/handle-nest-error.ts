import { HttpException } from '@nestjs/common';
import * as changeCase from 'change-case';
import { FilterResponseBodyFormat } from '../interfaces/filter-response-body-format';

/**
 * Function that will process an error response
 * when an error thrown by Nest exception {@link HttpException}
 *
 * params:
 * - `exception`: {@link HttpException}
 */
export const handleNestError = (
  exception: HttpException,
): FilterResponseBodyFormat => {
  const status = exception.getStatus();
  const message = exception.getResponse()['message'];
  const code =
    exception.getResponse()['code'] || changeCase.pascalCase(message);

  return {
    status,
    message,
    code,
    success: false,
  };
};
