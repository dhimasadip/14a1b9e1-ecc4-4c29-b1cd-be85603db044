import { HttpException } from '@nestjs/common';
import { FilterResponseBodyFormat } from '../interfaces/filter-response-body-format';

export const handleNestError = (
  exception: HttpException,
): FilterResponseBodyFormat => {
  const status = exception.getStatus();
  const message = exception.getResponse()['message'];
  const code = exception.getResponse()['code'];

  return {
    status,
    message,
    code,
    success: false,
  };
};
