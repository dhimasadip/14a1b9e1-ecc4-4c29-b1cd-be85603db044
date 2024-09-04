import { upperFirst } from 'lodash';
import { ValidationError } from 'sequelize/types';
import { FilterResponseBodyFormat } from '../interfaces/filter-response-body-format';

export const handleSequelizeValidationError = (
  exception: ValidationError,
): FilterResponseBodyFormat => {
  const { type, message, path } = exception.errors[0];

  if (type === 'validation error') {
    return generateErrorBody(`TypeError:${upperFirst(path || '')}`, message);
  }

  if (type === ('notNull Violation' as any)) {
    return generateErrorBody(`Null:${upperFirst(path || '')}`, message);
  }

  if (type === 'string violation') {
    return generateErrorBody(
      `isArrayOrObject:${upperFirst(path || '')}`,
      message,
    );
  }

  if (type === 'unique violation') {
    return generateErrorBody(`NotUnique:${upperFirst(path || '')}`, message);
  }

  return generateErrorBody(exception.name, exception.message);
};

const generateErrorBody = (
  code: string,
  message: string,
): FilterResponseBodyFormat => {
  return {
    code,
    message,
    status: 409,
    success: false,
  };
};
