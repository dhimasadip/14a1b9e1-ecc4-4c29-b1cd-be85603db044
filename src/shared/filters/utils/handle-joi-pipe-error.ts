import { HttpStatus } from '@nestjs/common';
import { JoiPipeValidationException } from 'nestjs-joi';
import { FilterResponseBodyFormat } from '../interfaces/filter-response-body-format';

export const handleJoiPipeError = (
  exception: JoiPipeValidationException,
): FilterResponseBodyFormat => {
  const status = HttpStatus.UNPROCESSABLE_ENTITY;
  const message = exception.message;
  const code = 'InputValidationError';

  return {
    status,
    message,
    code,
    success: false,
  };
};
